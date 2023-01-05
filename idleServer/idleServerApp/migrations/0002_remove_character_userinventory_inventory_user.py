# Generated by Django 4.1.3 on 2023-01-04 22:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('idleServerApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='character',
            name='userInventory',
        ),
        migrations.AddField(
            model_name='inventory',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='character_inventory', to='idleServerApp.character'),
        ),
    ]