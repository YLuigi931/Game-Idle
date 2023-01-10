from django.urls import path, re_path
from . import views

urlpatterns = [
   
    path('', views.index),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
    path('addItem/', views.addItem),
    path('addGatheringItem/', views.addGatheringItem),
    path('deleteItem/', views.deleteItem),
    path('equipItem/', views.equipItem),
    path('character/', views.character),
    path('myInventory/',views.myInventory),
    path('market/', views.market_inventory),
    path('getInventory/', views.getInventory),
    path('getEquipment/', views.getEquipment),
    path('myEquipmentInventory/', views.myEquipmentInventory),
    re_path(r'.*', views.index, name='index'),
]
