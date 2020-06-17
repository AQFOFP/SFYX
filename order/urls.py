from django.conf.urls import url

from order.views import *

urlpatterns = [
    url(r'^order/$', order, name='order'),
    url(r'^cartfinish/$', cartfinish, name='cartfinish'),
    url(r'^orderlist/$', orderlist, name='orderlist'),
    url(r'^orderdata/(\d+)/$', orderdata, name='orderdata'),

    url(r'^pay/(\w+)/', pay, name='pay'),
    url(r'^notify/', notify),
    url(r'^result/', result),

]