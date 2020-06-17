from django.conf.urls import url

from home.views import *

urlpatterns = [
    url(r'^$', home),
    url(r'^index/$', home, name='home'),
    url(r'^goods/(\d+)$', goodsdetail, name='goodsdetail')
]