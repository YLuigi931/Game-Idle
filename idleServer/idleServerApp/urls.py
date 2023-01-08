from django.urls import path, re_path
from . import views

urlpatterns = [
   
    path('', views.index),
     path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
    path('getInventory/', views.getInventory),
    path('addItem/', views.addItem),
    path('addGatheringItem/', views.addGatheringItem),
    path('deleteItem/', views.deleteItem),
    path('character/', views.character),
    re_path(r'.*', views.index, name='index'),
]
