from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .serializer import *
from rest_framework.response import Response


# Create your views here.

def index(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(["POST"])
def signIn(request):
    username=request.data['username']
    password=request.data["password"]
    print(username, password)
    user = authenticate(password=password, username=username)
    print(user, 'user')
    if user is not None:
        try:
            login(request._request, user)
            return JsonResponse({'signIn':True})
        except Exception as e:
            print(e)
            return JsonResponse({'signIn':False})
    else:
        return JsonResponse({'signIn':False})


@api_view(["POST"])
def signUp(request):
    username=request.data['username']
    first_name=request.data['first_name']
    last_name=request.data['last_name']
    email=request.data["email"]
    password=request.data["password"]
    print(email, password,)
    try:
        new_user = AppUser.objects.create_user(
            username=username, email=email, password=password,
            first_name=first_name,last_name=last_name)

        print(new_user)
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup':False})
        
@api_view(["GET"])
def curr_user(request):

    if request.user.is_authenticated:
        user = request.user
        data= UserSerializer(user, many=False)
        print(data.data)
        return Response(data.data)
    else:
        return JsonResponse({"user":None})

def signOut(request):
    try:
        logout(request)
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})

@api_view(["POST", "GET"])
def character(request):
    print(request.data)
    if request.method =='POST':
        name= request.data['name']
        sprite= request.data['sprite']
        class_type= request.data['class_type']
        attack= request.data['attack']
        defense= request.data['defense']
        dodge= request.data['dodge']
        crit_chance= request.data['crit_chance']
        user_character= AppUser.objects.get(id=request.user.id)
        saveChar = Character(
            name= name,
            sprite= sprite,
            class_type= class_type,
            attack= attack,
            defense= defense,
            dodge= dodge,
            crit_chance= crit_chance,
            user_character=user_character
            )
        print(saveChar)
        saveChar.save()
        return JsonResponse({'new_character': True})

    if request.method =='GET':
        character = Character.objects.get(user_character=request.user.id)
        SerializerChar = CharacterSerializer(character, many=False)
        return Response(SerializerChar.data)
    
