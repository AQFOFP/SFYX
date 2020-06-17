from django.db import models

# Create your models here.
class Lubo(models.Model):
    imgaddr = models.CharField(max_length=200)
    imgtype = models.CharField(max_length=200)

    class Meta:
        db_table = 'sfyx_lubo'

class Goodstype(models.Model):
    typename = models.CharField(max_length=100)
    parent = models.ForeignKey("Goodstype", null=True, blank=True)
    class Meta:
        db_table = 'sfyx_goodstype'


class Goods(models.Model):
    goodsname = models.CharField(max_length=100)
    weight = models.CharField(max_length=100)
    allweight = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    allprice = models.DecimalField(max_digits=6, decimal_places=2)
    privilege = models.CharField(max_length=100)
    mustbuy = models.BooleanField(default=False, verbose_name="必买")
    goodsimg = models.CharField(max_length=100)
    detailimg = models.CharField(max_length=500, null=True,blank=True)
    storenums = models.IntegerField()

    class Meta:
        db_table = 'sfyx_goods'
