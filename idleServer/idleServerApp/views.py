from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .serializer import CharacterSerializer, UserSerializer, InventorySerializer, ItemSerializer, EnemySerializer
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
@api_view(['GET'])
def getInventory(request):
    print('------')
    print(request.user.id)
    print('------')
    inventory = Inventory.objects.get(user_id=request.user.id)
    print(inventory)
    data= InventorySerializer(inventory, many=False)
    return Response(data.data)

@api_view(["POST"])
def addItem(request):
    print('hi')
    print(request.data)
    print(request.data['item'])
    print(request.user.id)
    inventory = Inventory.objects.get(user_id=request.user.id)
    print(inventory.weapon_inventory)
    print(inventory)
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
    inventory = Inventory.objects.get(user_id=request.user.id)
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
            weapon_inventory=[{'empty':True}],
            armor_inventory=[{'empty':True}],
            item_inventory=[{'empty':True}],
            user = saveChar
        )
        
        saveInv.save()
        print(saveInv)
        return JsonResponse({'new_character': True})

    if request.method =='GET':
        character = Character.objects.get(user_character=request.user.id)
        SerializerChar = CharacterSerializer(character, many=False)
        return Response(SerializerChar.data)



@api_view(["POST", "GET"])
def market_inventory(request):
    
    if request.method == "GET":
        all_Inventory = list(Item.objects.all().values())
        # print(all_Inventory)
        # SerializerChar = ItemSerializer(all_Inventory, many=False)
        return JsonResponse({'success':all_Inventory})
    
    if request.method == 'POST':
        
        # userID = request.data['user']
        # item = request.data['itemData']
        print(request.data)
        #get the bag that has the same user id as the user
        inventoryBag = Inventory.objects.all().filter(user=request.data['user']).values()
        print(inventoryBag)
        
        #assemble the new list here  
        for x in inventoryBag:
            print(x.get('item_inventory'))
            new_lst=x.get('item_inventory')
            new_lst.append(request.data['itemData'])
            print(new_lst)
            
        #call the bag once more and update it...Save yay
        Inventory.objects.all().filter(user=request.data['user']).update(item_inventory=new_lst)
        
        #print to verify its in there
        verify = Inventory.objects.all().filter(user=request.data['user']).values()
        print(verify)
        
        return JsonResponse({'success':True})

@api_view(["POST"])   
def myInventory(request):
    if request.method == 'POST':
        # print(request.data['userId'])
        inventoryBag = Inventory.objects.all().filter(user=request.data['userId']).values()
        print(inventoryBag)
        for x in inventoryBag:
            # print(x.get('item_inventory'))
            curr_lst = x.get('item_inventory')
            print(curr_lst)
        
        return JsonResponse({'success':curr_lst})

@api_view(['GET'])
def get_enemies(request):

    if request.method == "GET":
        all_enemies = list(Enemy.objects.all().values())

        return JsonResponse({'success':all_enemies})

@api_view(['PUT'])
def update_xp(request, user_id):
    print(user_id)
    print(request)
    if request.method == 'PUT':
        try:
            print(request)
            character = Character.objects.get(id=user_id)
            updated_xp = request.data['xp']
            character.xp = updated_xp
            print(character.xp)
            character.save()
            return JsonResponse({'update': True})
        except Exception as e:
            return JsonResponse({'update': False})



