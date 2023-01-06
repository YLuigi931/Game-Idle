from django.urls import path, re_path
from . import views

urlpatterns = [
   
    path('', views.index),
     path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
<<<<<<< HEAD
    path('addItem/', views.addItem),
    path('deleteItem/', views.deleteItem),
=======
    path('character/', views.character),
>>>>>>> 9f2b75f5e5226ee0eb19e649fbe076fe2f81f377
    re_path(r'.*', views.index, name='index'),
]