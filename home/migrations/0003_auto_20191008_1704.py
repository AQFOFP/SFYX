# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-10-08 09:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_goods_detailimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='detailimg',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
