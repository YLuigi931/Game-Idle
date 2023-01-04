from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

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


class Inventory(models.Model):
    max_spaces = models.PositiveIntegerField()
    weapon_inventory = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    armor_inventory = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    item_inventory = ArrayField(models.CharField(max_length=200),blank=True, null=True)

class Character(models.Model):
    name = models.CharField(max_length=15)
    user_character = models.ForeignKey(AppUser, on_delete=models.DO_NOTHING, related_name='user_character')
    userInventory = models.ForeignKey(Inventory, on_delete=models.DO_NOTHING, related_name='character_inventory', blank=True, null=True)
    sprite = models.CharField(max_length=250)
    class_type = models.CharField(max_length=15)
    level = models.IntegerField(default=1, validators=[MaxValueValidator(100), MinValueValidator(1)])
    xp = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
# fighting Stats 
    #overall
    hp = models.IntegerField(default=10, validators=[MaxValueValidator(100), MinValueValidator(1)])
    attack =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    defense =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    dodge = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    crit_chance =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    #stats
    strength = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    dexterity =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    wisdom =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    speed =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    constitution = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
# Non-fighting Stats
    #gathering
    fishing = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    harvesting = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    logging = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    mining = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    #refining
    smelting = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    wood_working = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    #crafting 
    armoring = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    arcana = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    cooking = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    weapons = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
   

  
class Enemy(models.Model):
    name = models.CharField(max_length=15)
    hp = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    attack =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    defense =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    dodge = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])



