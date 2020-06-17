from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=200, unique=True, default='优选用户')
    phone = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    email = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'sfyx_user'
