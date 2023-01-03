from django.urls import path, re_path
from . import views

urlpatterns = [
   
    path('', views.index),
     path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user/', views.curr_user),
    re_path(r'.*', views.index, name='index'),
]