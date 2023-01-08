from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser


        fields = ['id', 'email', 'username', 'first_name', 'last_name']

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Character
        fields = '__all__'


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = equipInventory
        fields = ['head', 'chest', 'gloves', 'boots', 'weapon']

