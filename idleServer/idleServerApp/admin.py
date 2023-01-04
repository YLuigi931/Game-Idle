from django.contrib import admin
from idleServerApp.models import *

# Register your models here.

admin.site.register(AppUser)
admin.site.register(Character)
admin.site.register(Weapon)
admin.site.register(Armor)
admin.site.register(Inventory)
admin.site.register(Item)
admin.site.register(Enemy)