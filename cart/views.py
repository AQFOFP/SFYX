import json

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django_redis import get_redis_connection

from home.models import Goods
from user.models import User


def cart(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        user = User.objects.filter(phone=phone).first()
        context = {}

        if phone and user:
            context['user']=user

        return render(request, 'car.html', context)



'''
ajax 购物车请求接口
'''
def cartdata(request):
    phone = request.session.get('phone')
    user = User.objects.filter(phone=phone).first()

    if phone and user:
        carts = cache.get(f'cart-{phone}',{})
    else:
        carts = request.COOKIES.get('cart')

    totalprice = 0
    if carts:
        cartdict = json.loads(carts)
        cartlist = []
        for goodsid in cartdict:
            goods = Goods.objects.get(id=goodsid)
            data_dict = {
                'goodsId': goods.id,
                'goodsImg': goods.goodsimg,
                'goodsName': goods.goodsname,
                'goodsWeight': goods.weight,
                'goodsPrice': goods.price,
                'goodsPrivilege': goods.privilege,
                'num': cartdict[goodsid]['num'],
                'goodsAllweight': cartdict[goodsid]['goodsAllweight'],
                'goodsAllprice': cartdict[goodsid]['goodsAllprice'],
                'selected': cartdict[goodsid]['selected'],
            }

            if cartdict[goodsid]['selected'] == '1':
                totalprice += goods.price * int(cartdict[goodsid]['num'])

            cartlist.append(data_dict)
    else:
        cartlist = []

    context = {
        'cartlist': cartlist,
        'totalprice': totalprice
    }

    return JsonResponse(context)


'''
商品加入购物车接口
'''

def savecart(request):
    goodsId = request.POST.get('goodsId')
    num = request.POST.get('num')
    selected = request.POST.get('selected', '1')

    phone = request.session.get('phone')
    user = User.objects.filter(phone=phone).first()
    goods = Goods.objects.filter(id=int(goodsId)).first()

    if phone and user:
        carts = cache.get(f'cart-{phone}', {})

    else:
        carts = request.COOKIES.get('cart')

    if carts:
        cartdict = json.loads(carts)
        if cartdict.get(goodsId):
            cartdict[goodsId]['num'] = int(cartdict[goodsId]['num'])+ int(num)
            cartdict[goodsId]['goodsAllprice'] = float(goods.price) * float(cartdict[goodsId]['num'])
            cartdict[goodsId]['goodsAllweight'] = float(goods.weight) * float(cartdict[goodsId]['num'])
            cartdict[goodsId]['selected'] = selected

        else:
            cartdict[goodsId] = {
                'num': num,
                'goodsPrice': float(goods.price),
                'goodsWeight': float(goods.weight),
                'goodsAllprice': float(goods.price),
                'goodsAllweight': float(goods.weight),
                'selected': selected,
            }
    else:
        cartdict = {goodsId: {'num': num, 'goodsPrice': float(goods.price), 'goodsWeight': float(goods.weight), 'goodsAllprice': float(goods.price),
                    'goodsAllweight': float(goods.weight), 'selected': selected, }}

    carts = json.dumps(cartdict)
    response = JsonResponse({'code': 1, 'status': 'success'})

    if phone and user:
        cache.set(f'cart-{phone}', carts)
        # redis_cli = get_redis_connection()
        # redis_cli.set(f'cart-{phone}', carts)

    else:
        response.set_cookie('cart', carts, max_age=24 * 60 * 60)

    return response




'''
从购物车删除商品接口
'''
def removecart(request, goodsid):
    phone = request.session.get('phone')
    user = User.objects.filter(phone=phone).first()

    if phone and user:
        carts = cache.get(f'cart-{phone}', {})

    else:
        carts = request.COOKIES.get('cart')

    if carts:
        cartdict = json.loads(carts)
        cartdict.pop(goodsid)


        carts = json.dumps(cartdict)
        response = JsonResponse({'code': 1, 'status': 'success'})

        if phone and user:
            carts = cache.set(f'cart-{phone}', carts, 30 * 24 * 60 * 60)

        else:
            response.set_cookie('cart', carts, max_age=24 * 60 * 60)

        return response

    else:
        return JsonResponse({'code': -1, 'status': 'cart empty'})



'''
清空购物车接口
'''
def emptycart(request):
    phone = request.session.get('phone')
    user = User.objects.filter(phone=phone).first()

    if phone and user:
        cache.set(f'cart-{phone}',{})
        return JsonResponse({'code': 1, 'status': 'success'})

    else:
        carts = request.COOKIES.get('cart')
        response = JsonResponse({'code': 1, 'status': 'success'})
        response.delete_cookie('cart')
        return response



'''
购物车页面操作接口
'''
def cartaction(request):
    goodsId = request.POST.get('goodsId')
    num = request.POST.get('num')
    selected = request.POST.get('selected', '1')

    phone = request.session.get('phone')
    user = User.objects.filter(phone=phone).first()
    goods = Goods.objects.filter(id=int(goodsId)).first()

    if phone and user:
        carts = cache.get(f'cart-{phone}', {})

    else:
        carts = request.COOKIES.get('cart')

    if carts:
        cartdict = json.loads(carts)
        if cartdict.get(goodsId):
            cartdict[goodsId]['num'] = int(num)
            cartdict[goodsId]['goodsAllprice'] = float(goods.price) * float(cartdict[goodsId]['num'])
            cartdict[goodsId]['goodsAllweight'] = float(goods.weight) * float(cartdict[goodsId]['num'])
            cartdict[goodsId]['selected'] = selected

        else:
            cartdict[goodsId] = {
                'num': num,
                'goodsPrice': float(goods.price),
                'goodsWeight': float(goods.weight),
                'goodsAllprice': float(goods.price),
                'goodsAllweight': float(goods.weight),
                'selected': selected,
            }
    else:
        cartdict =  {goodsId:{'num': num, 'goodsPrice': float(goods.price), 'goodsWeight': float(goods.weight), 'goodsAllprice': float(goods.price),
                     'goodsAllweight': float(goods.weight), 'selected': selected,}}

    carts = json.dumps(cartdict)
    response = JsonResponse({'code': 1, 'status': 'success'})

    if phone and user:
        carts = cache.set(f'cart-{phone}', carts, 30*24*60*60)
    else:
        response.set_cookie('cart', carts , max_age=24 * 60 * 60)

    return response


