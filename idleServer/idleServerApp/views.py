from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .serializer import CharacterSerializer, UserSerializer
from rest_framework.response import Response
from .models import *






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

# Inventory and Item management start
    # in the following functions, user id and item should be passed in request
@api_view(["POST"])
def addItem(request):
    inventory = Inventory.objects.get(character_inventory=request.user.id)
    item = Item.objects.get(name=request.data['item'])
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    if inventoryLength >= inventory.max_spaces:
        print("Inventory is full!")
    else:
        inventory.weapon_inventory.append(item)
        inventory.save()
    print(inventory.weapon_inventory)
    return JsonResponse({'AddItem':'Added Successfully'})

@api_view(["POST"])
def addGatheringItem(request):
    inventory = Inventory.objects.get(character_inventory=request.user.id)
    item = Item.objects.get(name=request.data['item'])
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    if f'{item}' in inventory.item_inventory:
        item.quantity +=1
        inventory.save()
    else:
        if inventoryLength >= inventory.max_spaces:
            print("Inventory is full!")
        else:
            inventory.item_inventory.append(item)
            inventory.save()
        print(inventory.item_inventory)
    return JsonResponse({'AddGatheringItem':'Added Gathering Item Successfully'})

@api_view(["POST"])
def equipItem(request):
    #this is the user's equipment inventory
    equipment = equipInventory.objects.get(character_equipment=request.user.id)

    #this is the user's regular inventory
    inventory = Inventory.objects.get(character_inventory=request.user.id)
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)

    #this is the item from the database
    item = Item.objects.get(name=request.data['item'])

    #this is the index of the item in the user's inventory that will be equipped to the user
    item_index = inventory.armor_inventory.index({request.data['item']})

    #this is the specific armor slot that the equipment will be placed in
    slot = request.data['slot']

    #this is the item currently equipped in the slot 
    itemToBeReplaced = equipInventory.head[0]


    
    if slot == 'head':
        
        if equipInventory.head[0] == 'Head slot':
            #if the user is a new character and has nothing equipped, just equip the item
            equipInventory.head[0] = item
        else:
            #if the user has an item equipped, swap the equipped item with the item in the inventory 
            inventory.armor_inventory[item_index] = itemToBeReplaced
            equipInventory.head[0] = item
        inventory.save()
        equipment.save()

    elif slot == 'chest':
        if equipInventory.chest[0] == 'Head slot':
            #if the user is a new character and has nothing equipped, just equip the item
            equipInventory.chest[0] = item
        else:
            #if the user has an item equipped, swap the equipped item with the item in the inventory 
            inventory.armor_inventory[item_index] = itemToBeReplaced
            equipInventory.chest[0] = item
        inventory.save()
        equipment.save()
    elif slot == 'gloves':
        if equipInventory.gloves[0] == 'Head slot':
            #if the user is a new character and has nothing equipped, just equip the item
            equipInventory.gloves[0] = item
        else:
            #if the user has an item equipped, swap the equipped item with the item in the inventory 
            inventory.armor_inventory[item_index] = itemToBeReplaced
            equipInventory.gloves[0] = item
        inventory.save()
        equipment.save()
    elif slot == 'boots':
        if equipInventory.boots[0] == 'Head slot':
            #if the user is a new character and has nothing equipped, just equip the item
            equipInventory.boots[0] = item
        else:
            #if the user has an item equipped, swap the equipped item with the item in the inventory 
            inventory.armor_inventory[item_index] = itemToBeReplaced
            equipInventory.boots[0] = item
        inventory.save()
        equipment.save()
    elif slot == 'weapon':
        if equipInventory.weapon[0] == 'Head slot':
            #if the user is a new character and has nothing equipped, just equip the item
            equipInventory.weapon[0] = item
        else:
            #if the user has an item equipped, swap the equipped item with the item in the inventory 
            inventory.armor_inventory[item_index] = itemToBeReplaced
            equipInventory.weapon[0] = item
        inventory.save()
        equipment.save()
    

    return JsonResponse({'EquipItem':'Item Equipped Successfully'})

    
@api_view(['POST'])
def deleteItem(request):
    inventory = Inventory.objects.get(character_inventory=request.user.id)
    item = Item.objects.get(name=request.data['item'])
    print(item)
    print(inventory.weapon_inventory)
    print(f'{item}' in inventory.weapon_inventory)
    if f'{item}' in inventory.armor_inventory:
        inventory.armor_inventory.remove(f'{item}')
        print(inventory.armor_inventory)
        inventory.save()
    elif f'{item}' in inventory.item_inventory:
        inventory.item_inventory.remove(f'{item}')
        print(inventory.item_inventory)
        inventory.save()
    elif f'{item}' in inventory.weapon_inventory:
        inventory.weapon_inventory.remove(f'{item}')
        print(inventory.weapon_inventory)
        inventory.save()
    else:
        print("Sorry, unable to complete that action")
    return JsonResponse({'DeleteItem':'Deleted Successfully'})

# Inventory and Item management end

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
        
        
        saveChar.save()
        print(saveChar)
        saveInv = Inventory(
            max_spaces = 10,
            weapon_inventory = ["Empty"],
            armor_inventory = ["Empty"],
            item_inventory = ["Empty"],
            user = saveChar
        )

        saveEq = equipInventory(
            user = saveChar,
            head = ["Head Slot"],
            chest = ["Chest Slot"],
            gloves = ["Glove Slot"],
            boots = ["Boots Slot"],
            weapon = ["Weapon Slot"]
        )
        
        saveInv.save()
        print(saveInv)
        saveEq.save()
        print(saveEq)
        return JsonResponse({'new_character': True})

    if request.method =='GET':
        character = Character.objects.get(user_character=request.user.id)
        SerializerChar = CharacterSerializer(character, many=False)
        return Response(SerializerChar.data)
