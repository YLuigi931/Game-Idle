# Generated by Django 4.1.4 on 2023-01-04 00:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('idleServerApp', '0004_remove_character_arcana_remove_character_armoring_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory',
            name='user',
        ),
        migrations.DeleteModel(
            name='Character',
        ),
    ]
