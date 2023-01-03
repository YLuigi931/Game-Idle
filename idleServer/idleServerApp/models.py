from django.db import models
from django.contrib.auth.models import (AbstractUser)

class AppUser(AbstractUser):
    """
    user account
    """
    username = models.CharField(
        max_length=150,
        unique=True,
    )
    email = models.EmailField(
        max_length=150,
        unique=True,
    )
    is_active =  models.BooleanField(
       default=True,
       help_text='''
       Designates whether this user should be treated as active. 
       Unselect this instead of deleting accounts.', verbose_name='active'
       ''',
    )
    REQUIRED_FIELDS = []



# class Character(models.Model):
#     name = models.CharField(max_length=15)
#     user_character = models.ForeignKey(AppUser, on_delete=models.DO_NOTHING, related_name='user_character')

# class Enemy(models.Model):
#     name = models.CharField(max_length=15)
   
class Item(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    max_stacks = models.PositiveIntegerField()
    rarity = models.CharField(max_length=10)
    description = models.TextField(max_length=255)


class Weapon(Item):
    attack = models.PositiveIntegerField()

class Armor(Item):
    defense = models.PositiveIntegerField()

class Character(models.Model):
    name = models.CharField(max_length=15)
    user_character = models.ForeignKey(AppUser, on_delete=models.DO_NOTHING, related_name='user_character')

class Enemy(models.Model):
    name = models.CharField(max_length=15)


class Inventory(models.Model):
    user = models.ForeignKey(Character, on_delete=models.DO_NOTHING, related_name='character_inventory')
    max_spaces = models.PositiveIntegerField()
    in_inventory = ArrayField(models.JSONField(null=True, blank=True), blank=True)
