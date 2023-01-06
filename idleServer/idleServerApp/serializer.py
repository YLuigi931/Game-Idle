from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser

        fields = ['id', 'email', 'username', 'first_name', 'last_name']

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
<<<<<<< HEAD
        model = Character
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
=======
        model=Character
        fields = '__all__'

>>>>>>> 9f2b75f5e5226ee0eb19e649fbe076fe2f81f377
