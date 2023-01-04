# Generated by Django 4.1.4 on 2023-01-03 23:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('idleServerApp', '0002_character_enemy_item_armor_weapon_inventory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='hp',
            field=models.IntegerField(default=10, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='character',
            name='level',
            field=models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(1)]),
        ),
    ]
