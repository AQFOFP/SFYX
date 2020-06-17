from django.conf.urls import url

from cart.views import *

urlpatterns = [
    url(r'^cart/$', cart, name='cart'),
    url(r'^cartdata/$', cartdata, name='cartdata'),
    url(r'^savecart/$', savecart, name='savecart'),
    url(r'^removecart/(\d+)/$', removecart, name='removecart'),
    url(r'^cartaction/$', cartaction, name='cartaction'),
    url(r'^emptycart/$', emptycart, name='emptycart'),
]