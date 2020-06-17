import json
import uuid

from django.contrib.auth.hashers import make_password, check_password
from django.core.cache import cache
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from user.models import User


def login(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        if phone:
            user = User.objects.filter(phone=phone).first()
            return render(request, 'login.html', {'user':user})
        else:
            return render(request, 'login.html')

    elif request.method == 'POST':
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        user = User.objects.filter(phone=phone).first()

        if user:
            flag = check_password(password, user.password)
            if flag:
                request.session['phone'] = phone
                request.session.set_expiry(86400)
                response = JsonResponse({'code':1, 'status':'success'})
                return cookie_to_redis(request, response)

            else:
                return JsonResponse({'code':-1, 'status':'密码输入有误！！！'})
        else:
            return JsonResponse({'code':-1, 'status':'该手机号未注册！！！'})


def logout(request):
    if request.method=='GET':
        request.session.delete('phone')
        request.session.flush()
        return redirect(reverse('users:login'))


def register(request):
    if request.method == 'GET':
        phone = request.session.get('phone')
        if phone:
           return redirect(reverse('homes:home'))
        return render(request, 'register.html')

    elif request.method == 'POST':
        phone = request.POST.get('username')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')

        user = User.objects.filter(phone=phone).first()
        if not all([phone, password, password2]):
            return JsonResponse({'code':-1, 'status':'还有未填写的信息！！！'})
        elif user:
            return JsonResponse({'code':-1, 'status':'该手机号已注册！！！'})
        elif password != password2:
            return JsonResponse({'code':-1, 'status':'密码与确认密码不一致！！！'})

        else:
            username = '优选用户'+uuid.uuid1().hex[0:5]
            user = User.objects.create(username=username, phone=phone, password=make_password(password))
            if user:
                request.session['phone'] = user.phone
                request.session.set_expiry(86400)
                return JsonResponse({'code':1,
                                     'status':'注册成功',
                                     'username': user.username,
                                     'phone': user.phone,
                                     })
            else:
                return HttpResponse('系统出现异常，请联系网站管理员')


def cookie_to_redis(request, response):
    '''
    取出cookie里面的数据，判断cookie中的数据是否在redis里面
    如果存在就覆盖
    如果不存在就添加
    '''
    # 取cookie中的数据
    cookie_data = request.COOKIES.get('cart')

    # 取redis中的数据
    phone = request.session.get('phone')
    # redis_cli = get_redis_connection('cart')
    # redis_data = redis_cli.get(f'cart-{username}')
    redis_data = cache.get(f'cart-{phone}')

    if cookie_data:

        # 如果redis里面没有数据
        if not redis_data:
            redis_data = cookie_data
        else:
            # { '456':{'count':'1', 'selected':'1'} }
            cookie_data = json.loads(cookie_data)
            redis_data = json.loads(redis_data)

            for cookie in cookie_data:
                if redis_data.get(cookie):
                    redis_data[cookie]['num'] = int(redis_data[cookie]['num'])+ int(cookie_data[cookie]['num'])
                    redis_data[cookie]['goodsAllprice'] = float(redis_data[cookie]['goodsPrice']) * float(redis_data[cookie]['num'])
                    redis_data[cookie]['goodsAllweight'] = float(redis_data[cookie]['goodsWeight']) * float(redis_data[cookie]['num'])
                else:
                    redis_data[cookie] = cookie_data[cookie]
            redis_data = json.dumps(redis_data)

        cache.set(f'cart-{phone}', redis_data)

        # 删除cookie里面的数据
        response.delete_cookie('cart')

    return response