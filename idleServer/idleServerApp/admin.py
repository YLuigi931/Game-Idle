from django.contrib import admin
<<<<<<< HEAD
from .models import AppUser, Item, Weapon, Armor, Character, Enemy, Inventory

admin.site.register(AppUser)
admin.site.register(Item)
admin.site.register(Weapon)
admin.site.register(Armor)
admin.site.register(Character)
admin.site.register(Enemy)
admin.site.register(Inventory)
=======
from idleServerApp.models import *

# Register your models here.

admin.site.register(AppUser)
admin.site.register(Character)
admin.site.register(Weapon)
admin.site.register(Armor)
admin.site.register(Inventory)
admin.site.register(Item)
admin.site.register(Enemy)
>>>>>>> 9f2b75f5e5226ee0eb19e649fbe076fe2f81f377
