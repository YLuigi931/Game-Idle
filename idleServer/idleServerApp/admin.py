from django.contrib import admin
from .models import AppUser, Item, Weapon, Armor, Character, Enemy, Inventory

admin.site.register(AppUser)
admin.site.register(Item)
admin.site.register(Weapon)
admin.site.register(Armor)
admin.site.register(Character)
admin.site.register(Enemy)
admin.site.register(Inventory)
