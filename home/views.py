from django.shortcuts import render

# Create your views here.
from home.models import *
from user.models import User


def home(request):
    if request.method == 'GET':
        lumains = Lubo.objects.filter(imgtype='main')
        lusides = Lubo.objects.filter(imgtype='side')
        yxbms = Goods.objects.filter(mustbuy=1)
        phone = request.session.get('phone')
        context = {
            'lumains': lumains,
            'lusides': lusides,
            'yxbms': yxbms,
        }
        if phone:
            user = User.objects.filter(phone=phone).first()
            if user:
                context['user']=user
                return render(request, 'index.html', context)
            else:
                return render(request, 'index.html', context)
        else:
            return render(request, 'index.html', context)



def goodsdetail(request, goodsid):
    goods = Goods.objects.filter(id=goodsid).first()
    if goods:
        if goods.detailimg:
            goodssmalls = goods.detailimg.split('#')
            context = {
                'goods': goods,
                'goodssmalls': goodssmalls,
                }
        else:
            context = {
                'goods': goods,
                }


        phone = request.session.get('phone')
        if phone:
            user = User.objects.filter(phone=phone).first()
            if user:
                context['user'] = user
                return render(request, 'goodsdetail.html', context)

            else:
                return render(request, 'goodsdetail.html', context)
        else:
            return render(request, 'goodsdetail.html', context)
