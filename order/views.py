import datetime
from time import sleep

from django.core.cache import cache
from django.db import transaction


import random

from Crypto.PublicKey import RSA
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from order.alipay.alipay import AliPay
import json

# Create your views here.
from django.urls import reverse

from home.models import Goods
from order.models import *
from user.models import User


def order(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        user = User.objects.filter(phone=phone).first()
        sleep(1)
        if phone and user:
            cart_data = json.loads(cache.get(f"cart-{phone}"))
            cart_dict = {}
            for cart in cart_data:
                if cart_data[cart]['selected'] == '1':
                    cart_dict[int(cart)] = int(cart_data[cart]['num'])

            if cart_dict:
                # 开启事务
                with transaction.atomic():

                    # 创建事务的保存点
                    save_id = transaction.savepoint()
                    order_code = datetime.datetime.now().strftime('%Y%m%d%H%M%S') + str(user.phone)
                    order = Order.objects.create(
                        phone=user.phone,
                        order_code=order_code,
                        total_count=sum(cart_dict.values()),
                        total_amount=0,
                        status=1
                    )

                    totalcount = 0
                    # 4,生成子订单
                    for gid, count in cart_dict.items():

                        while True:
                            good = Goods.objects.get(id=gid)
                            if count > good.storenums:
                                # 回滚事务
                                transaction.savepoint_rollback(save_id)
                                return HttpResponse('商品库存不足')

                            # 乐观锁，减库存的时候判断，当前的库存是否等于之前查询过的库存
                            res = Goods.objects.filter(id=good.id, storenums=good.storenums).update(
                                storenums=good.storenums - count,
                            )
                            if not res:
                                continue

                            # 生成子订单
                            OrderDetail.objects.create(
                                phone=user.phone,
                                order_code=order_code,
                                goods_id=gid,
                                counts=count,
                                price=float(good.price)
                            )

                            totalcount += float(good.price) * count

                            # 清除选中商品的redis数据
                            del cart_data[str(gid)]
                            break

                    order.total_amount = totalcount
                    order.save()

                    cache.set(f'cart-{phone}', json.dumps(cart_data), 30*24*60*60)
                    transaction.savepoint_commit(save_id)
                    return redirect(reverse('orders:cartfinish'))

            else:
                return HttpResponse('未选择任何商品')
        else:
            return redirect(reverse('users:login'))
    else:
        return redirect(reverse('homes:home'))


def cartfinish(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        user = User.objects.filter(phone=phone).first()
        if phone and user:
            orders = Order.objects.all()
            return render(request, 'cartfinish.html', {'user':user})
        else:
            return redirect(reverse('users:login'))


def orderlist(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        user = User.objects.filter(phone=phone).first()
        if phone and user:
            orders = Order.objects.filter(phone=phone, status=1)
            return render(request, 'order.html', {'orders':orders, 'user':user})
        else:
            return redirect(reverse('users:login'))


def orderdata(request, status):
    if request.method == 'GET':
        phone = request.session.get('phone')
        user = User.objects.filter(phone=phone).first()
        if phone and user:
            orders = Order.objects.filter(phone=phone, status=int(status))
            orderlist = []
            if orders:
                for order in orders:
                    orderdict = {
                        'order_code': order.order_code,
                        'total_count': order.total_count,
                        'total_amount': order.total_amount,
                        'status': order.status
                    }
                    orderlist.append(orderdict)


            data = {
                'code':1,
                'status':'success',
                'data': orderlist
            }

            return JsonResponse(data)
        else:
            return JsonResponse({'code':-1, 'status':'not login'})



alipay = None

# 支付
def pay(request, orderid):
    # 传递参数初始化支付类
    alipay = AliPay(
        appid="2016101400681757",  # 设置签约的appid
        app_notify_url="http://127.0.0.1:8000/notify/",  # "http://projectsedus.com/",  # 异步支付通知url【发送支付状态信息】
        app_private_key_path=r"order/alipay/ying_yong_si_yao.txt",  # 设置应用私钥
        alipay_public_key_path=r"order/alipay/zhi_fu_bao_gong_yao.txt",  # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        debug=True,  # 默认False,            # 设置是否是沙箱环境，True是沙箱环境
        return_url="http://127.0.0.1:8000/result/",  # "http://47.92.87.172:8000/"  # 同步支付通知url【将用户浏览器地址重定向回原网站】
    )

    order = Order.objects.filter(order_code=orderid).first()

    # 传递参数执行支付类里的direct_pay方法，返回签名后的支付参数，
    url = alipay.direct_pay(
        subject="商品支付信息",  # 订单名称
        # 订单号生成，一般是当前时间(精确到秒)+用户ID+随机数
        out_trade_no=str(orderid),  # 订单号
        total_amount=float(order.total_amount),  # 支付金额
        return_url="http://127.0.0.1:8000/result/"  # 支付成功后，跳转url
    )

    # 将前面后的支付参数，拼接到支付网关
    # 注意：下面支付网关是沙箱环境，最终进行签名后组合成支付宝的url请求
    re_url = "https://openapi.alipaydev.com/gateway.do?{data}".format(data=url)
    # print(re_url)
    return JsonResponse({'re_url': re_url})


# 异步支付通知url (上线后使用)
def notify(request):
    print("notify:", dict(request.GET))
    return HttpResponse("支付成功:%s" % (dict(request.GET)))


# 付款成功后跳转的url
def result(request):
    print("result:", dict(request.GET))

    # 支付成功后，将对应订单的状态改为：1 已支付

    print("*" * 100)
    param = dict(request.GET)

    # 修改订单状态
    order = Order.objects.filter(order_code=param['out_trade_no'][0]).first()
    order.status = 2
    order.save()


    sign = param['sign'][0]
    res = verify(param, sign)
    print("res: ", res)
    print("*" * 100)
    # return HttpResponse("支付成功:%s" % (dict(request.GET)))
    return render(request, 'payfinish.html')



from Crypto.Hash import SHA256
from Crypto.Signature import PKCS1_v1_5
from base64 import decodebytes, encodebytes

def _verify(raw_content, signature):
    # 开始计算签名
    alipay_public_key_path = r"order/alipay/zhi_fu_bao_gong_yao.txt"
    # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
    alipay_public_key = ""
    with open(alipay_public_key_path) as fp:
        alipay_public_key = RSA.import_key(fp.read())

    key = alipay_public_key
    signer = PKCS1_v1_5.new(key)
    digest = SHA256.new()
    digest.update(raw_content.encode("utf8"))
    if signer.verify(digest, decodebytes(signature.encode("utf8"))):
        return True
    return False


def verify(data, signature):
    if "sign_type" in data:
        sign_type = data.pop("sign_type")
    # 排序后的字符串
    unsigned_items = ordered_data(data)
    message = "&".join(u"{}={}".format(k, v) for k, v in unsigned_items)
    return _verify(message, signature)


def ordered_data(data):
    complex_keys = []
    for key, value in data.items():
        if isinstance(value, dict):
            complex_keys.append(key)

    # 将字典类型的数据dump出来
    for key in complex_keys:
        data[key] = json.dumps(data[key], separators=(',', ':'))

    return sorted([(k, v) for k, v in data.items()])