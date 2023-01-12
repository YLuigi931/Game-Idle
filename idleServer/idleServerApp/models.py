from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.fields import JSONField
import json


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
    rarity = models.CharField(max_length=75)
    description = models.TextField(max_length=255)

    def __str__(self):
        return self.name


class Weapon(Item):
    attack = models.PositiveIntegerField()
    def __str__(self):
        return self.name

class Armor(Item):
    defense = models.PositiveIntegerField()
    def __str__(self):
        return self.name

class Character(models.Model):
    name = models.CharField(max_length=15)
    user_character = models.ForeignKey(AppUser, on_delete=models.DO_NOTHING, related_name='user_character')
    sprite = models.CharField(max_length=250)
    class_type = models.CharField(max_length=15)
    level = models.IntegerField(default=1, validators=[MaxValueValidator(100), MinValueValidator(1)])
    
# fighting Stats 
    #overall
    combat_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    hp = models.IntegerField(default=100, validators=[MaxValueValidator(100), MinValueValidator(1)])
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
    fishing_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    fishing_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    harvesting_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    harvesting_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    logging_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    logging_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    mining_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    mining_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    #refining
    smelting_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    smelting_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    wood_working_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    wood_working_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    #crafting 
    armoring_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    armoring_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    arcana_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    arcana_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    cooking_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    cooking_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    weapons_xp = models.IntegerField(default=0, validators=[MaxValueValidator(100000), MinValueValidator(1)])
    weapons_level = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])

class Inventory(models.Model):
    max_spaces = models.PositiveIntegerField()
    weapon_inventory = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    armor_inventory = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    item_inventory = ArrayField(models.CharField(max_length=200), blank=True, null=True)
    user = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_inventory", blank=True, null=True)


class equipInventory(models.Model):
    head = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    chest = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    gloves = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    boots = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    weapon = ArrayField(models.CharField(max_length=200),blank=True, null=True)
    user = models.ForeignKey(Character, on_delete=models.DO_NOTHING, related_name="character_equipment", blank=True, null=True)

    

class Enemy(models.Model):
    name = models.CharField(max_length=40)
    location = models.CharField(default=None, max_length=40)
    base_damage = models.IntegerField(default=5, validators=[MaxValueValidator(100), MinValueValidator(1)])
    level = models.IntegerField(default=1, validators=[MaxValueValidator(100), MinValueValidator(1)])
    hp = models.IntegerField(default=20, validators=[MaxValueValidator(1000), MinValueValidator(1)])
    attack =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    defense =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    dodge = models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    crit_chance =  models.IntegerField(default=0, validators=[MaxValueValidator(100), MinValueValidator(1)])
    combat_xp = models.IntegerField(default=10, validators=[MaxValueValidator(1000), MinValueValidator(1)])
    loot = ['gold coin']

  





