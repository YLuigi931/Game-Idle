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
   