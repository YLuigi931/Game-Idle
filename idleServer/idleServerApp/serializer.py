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
