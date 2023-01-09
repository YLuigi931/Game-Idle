from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .serializer import CharacterSerializer, UserSerializer, InventorySerializer, EquipmentSerializer
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
    inventory = Inventory.objects.get(user = request.user.id)
    
    item = Item.objects.get(name=request.data['item'])
    print('Adding Item: ', item)
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    if inventoryLength >= inventory.max_spaces:
        print("Inventory is full!")
    else:
        inventory.armor_inventory.append(item)
        inventory.save()
    print(inventory.armor_inventory)
    equipment = equipInventory.objects.get(user=request.user.id)
    serialEq = EquipmentSerializer(equipment)

    print(serialEq.data['head'])
    return JsonResponse({'AddItem':'Added Successfully'})

@api_view(["POST"])
def addGatheringItem(request):
    print(request.user.id)
    inventory = Inventory.objects.get(user=request.user.id)
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
    equipment = equipInventory.objects.get(user=request.user.id)
    serialEq = EquipmentSerializer(equipment)
    #this is the user's regular inventory
    inventory = Inventory.objects.get(user=request.user.id)
    print('Inventory: ', inventory)
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    #this is the item from the database
    item = Item.objects.get(name=request.data['item'])
    #this is the specific armor slot that the equipment will be placed in
    slot = request.data['slot']
    
    if slot == 'head':
        itemToBeReplaced = serialEq.data['head'][0]
        inventory.armor_inventory.remove(f'{item}')
        inventory.armor_inventory.append(itemToBeReplaced)
        equipment.head.append(item)
        equipment.head.remove(itemToBeReplaced)
        inventory.save()
        equipment.save()

    elif slot == 'chest':
        itemToBeReplaced = serialEq.data['chest'][0]
        inventory.armor_inventory.remove(f'{item}')
        inventory.armor_inventory.append(itemToBeReplaced)
        equipment.chest.append(item)
        equipment.chest.remove(itemToBeReplaced)
        inventory.save()
        equipment.save()
    elif slot == 'gloves':
        itemToBeReplaced = serialEq.data['gloves'][0]
        inventory.armor_inventory.remove(f'{item}')
        inventory.armor_inventory.append(itemToBeReplaced)
        equipment.gloves.append(item)
        equipment.gloves.remove(itemToBeReplaced)
        inventory.save()
        equipment.save()
    elif slot == 'boots':
        itemToBeReplaced = serialEq.data['boots'][0]
        inventory.armor_inventory.remove(f'{item}')
        inventory.armor_inventory.append(itemToBeReplaced)
        equipment.boots.append(item)
        equipment.boots.remove(itemToBeReplaced)
        inventory.save()
        equipment.save()
    elif slot == 'weapon':
        itemToBeReplaced = serialEq.data['weapon'][0]
        inventory.armor_inventory.remove(f'{item}')
        inventory.armor_inventory.append(itemToBeReplaced)
        equipment.weapon.append(item)
        equipment.weapon.remove(itemToBeReplaced)
        inventory.save()
        equipment.save()
    

    return JsonResponse({'EquipItem':'Item Equipped Successfully'})

    
@api_view(['POST'])
def deleteItem(request):
    inventory = Inventory.objects.get(user = request.user.id)
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
        weapon = Item.objects.get(name='test sword')
        armor = Item.objects.get(name='test boots')
        saveInv = Inventory(
            max_spaces = 10,
            weapon_inventory = [weapon],
            armor_inventory = [armor],
            item_inventory = ["Potion"],
            user = saveChar
        )

        baseHelm =Item.objects.get(name='test helmet')
        baseChest =Item.objects.get(name='test chest')
        baseGloves = Item.objects.get(name='test gloves')
        saveEq = equipInventory(
            user = saveChar,
            head = [baseHelm],
            chest = [baseChest],
            gloves = [baseGloves],
            boots = [armor],
            weapon = [weapon]
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

@api_view(['GET'])
def getInventory(request):
    inventory = Inventory.objects.get(user_id = request.user.id)
    data = InventorySerializer(inventory, many=False)
    print(data.data)
    return Response(data.data)

@api_view(['GET'])
def getEquipment(request):
    inventory = equipInventory.objects.get(user_id = request.user.id)
    data = EquipmentSerializer(inventory, many=False)
    return Response(data.data)
