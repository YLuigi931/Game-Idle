
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .serializer import CharacterSerializer, UserSerializer, InventorySerializer, ItemSerializer, EquipmentSerializer
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
    inventory = Inventory.objects.get(user = request.user.id)
    item = Item.objects.get(name=request.data['item'])
    print('Adding Item: ', item)
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    if inventoryLength >= inventory.max_spaces:
        print("Inventory is full!")
    else:
        inventory.armor_inventory.append(item)
        print(item.quantity)
        inventory.save()
    print(inventory.armor_inventory[1].quantity)
    equipment = equipInventory.objects.get(user=request.user.id)
    serialEq = EquipmentSerializer(equipment)

    print(serialEq.data['head'])
    return JsonResponse({'AddItem':'Added Successfully'})

@api_view(["POST"])
def addGatheringItem(request):
    print(request.user)
    character = Character.objects.get(user_character=request.user.id)
    inventory = Inventory.objects.get(user=character.id)
    print(inventory)
    item =  Item.objects.get(name=request.data['item'])
    print(item, 'item')
    inventoryLength = len(inventory.weapon_inventory) +  len(inventory.item_inventory) + len(inventory.armor_inventory)
    if f'{item}' in inventory.item_inventory:
        item.quantity +=1
        inventory.save()
        item.save()
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

@api_view(["POST", "GET", "PUT"])
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
        print(saveChar.id, 'FIX')
        weapon = Item.objects.get(name='Luck Blade')
        armor = Item.objects.get(name='Armor Boots +3')
        anItem = Item.objects.get(name='iron ore')
        saveInv = Inventory(
            max_spaces = 10,
            weapon_inventory = [weapon],
            armor_inventory = [armor],
            item_inventory = [anItem],
            user = saveChar
        )

        baseHelm =Item.objects.get(name='Armor Head +3')
        baseChest =Item.objects.get(name='Armor Body +3')
        baseGloves = Item.objects.get(name='Armor Gloves +3')
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


    if request.method == 'PUT':
        character = Character.objects.get(user_character=request.user.id)
    #gathering
        if 'fishing_xp' in request.data:
            character.fishing_xp = (character.fishing_xp +request.data['fishing_xp'])
        if 'harvesting_xp' in request.data:
            character.harvesting_xp = (character.harvesting_xp +request.data['harvesting_xp'])
        if 'logging_xp' in request.data:
            character.logging_xp = (character.logging_xp +request.data['logging_xp'])
        if 'mining_xp' in request.data:
            character.mining_xp = (character.mining_xp + request.data['mining_xp'])
    #refining
        if 'smelting_xp' in request.data:
            character.smelting_xp = (character.smelting_xp +request.data['smelting_xp'])
        if 'wood_working_xp' in request.data:
            character.wood_working_xp = (character.wood_working_xp +request.data['wood_working_xp'])
    #crafting 
        if 'armoring_xp' in request.data:
            character.armoring_xp = (character.wood_working_xp + request.data['armoring_xp'])
        if 'arcana_xp' in request.data:
            character.arcana_xp = (character.wood_working_xp + request.data['arcana_xp'])
        if 'cooking_xp' in request.data:
            character.cooking_xp = (character.wood_working_xp + request.data['cooking_xp'])
        if 'weapons_xp' in request.data:
            character.weapons_xp = (character.wood_working_xp + request.data['weapons_xp'])
        print(character.fishing_xp)
        print(character.harvesting_xp)
        print(character.logging_xp)
        print(character.mining_xp)
        print(character.smelting_xp)
        print(character.wood_working_xp)
        print(character.armoring_xp)
        print(character.arcana_xp)
        print(character.cooking_xp)
        print(character.weapons_xp)
        character.save()
        return JsonResponse({'upgradeCharacter':'upgrade Successful'})


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
        print(all_enemies)

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


@api_view(['GET'])
def getInventory(request):
    character = Character.objects.get(user_character=request.user.id)
    inventory = Inventory.objects.get(user_id = character.id)
    frontInv = []
    print(inventory)
    # for x,i in enumerate(inventory.weapon_inventory):
    #     theItem = Item.objects.get(name=inventory.weapon_inventory[x])
    #     frontInv.append({'name': theItem.name, 'quantity': theItem.quantity, 'max_stats': theItem.max_stacks, 'rarity': theItem.rarity, 'description': theItem.description})
    
    # for x,i in enumerate(inventory.weapon_inventory):
    #     theItem = Item.objects.get(name=inventory.weapon_inventory[x])
    #     frontInv.append({'name': theItem.name, 'quantity': theItem.quantity, 'max_stats': theItem.max_stacks, 'rarity': theItem.rarity, 'description': theItem.description})
    # for x,i in enumerate(inventory.armor_inventory):
    #     theItem = Item.objects.get(name=inventory.armor_inventory[x])
    #     frontInv.append({'name': theItem.name, 'quantity': theItem.quantity, 'max_stats': theItem.max_stacks, 'rarity': theItem.rarity, 'description': theItem.description})

    for x,i in enumerate(inventory.item_inventory):
        print(x, i)
        print(inventory.item_inventory[x])
        theItem = Item.objects.get(name=inventory.item_inventory[x])
        frontInv.append({'name': theItem.name, 'quantity': theItem.quantity, 'max_stats': theItem.max_stacks, 'rarity': theItem.rarity, 'description': theItem.description})
    

    print(frontInv)
    return JsonResponse({'thing': frontInv})

@api_view(["POST"])   
def myEquipmentInventory(request):
    if request.method == 'POST':
        # print(request.data['userId'])
        Bag = equipInventory.objects.get(user = request.user.id)
        curr_lst = [] 
        curr_lst.append(Bag.head[0])
        curr_lst.append(Bag.chest[0])
        curr_lst.append(Bag.gloves[0])
        curr_lst.append(Bag.boots[0])
        curr_lst.append(Bag.weapon[0])
        print('Current List: ',curr_lst)
        return JsonResponse({'success':curr_lst})

# @api_view(['GET'])
# def getEquipment(request):
#     inventory = equipInventory.objects.get(user_id = request.user.id)
#     data = EquipmentSerializer(inventory, many=False)
#     return Response(data.data)


########## might not need ##########
@api_view(['GET'])
def craftItem(request):
#the request should send the name of the item that needs to be created and the materials/amount needed 
    frontInv = []
    if request.method == 'GET':
            theItem = Item.objects.get(name='Copper Ore')
            frontInv.append({'name': theItem.name, 'quantity': theItem.quantity, 'max_stats': theItem.max_stacks, 'rarity': theItem.rarity, 'description': theItem.description})
            theItem2 = Item.objects.get(name='Iron Ore')
            frontInv.append({'name': theItem2.name, 'quantity': theItem2.quantity, 'max_stats': theItem2.max_stacks, 'rarity': theItem2.rarity, 'description': theItem2.description})
            theItem3 = Item.objects.get(name= 'Gold Ore')
            frontInv.append({'name': theItem3.name, 'quantity': theItem3.quantity, 'max_stats': theItem3.max_stacks, 'rarity': theItem3.rarity, 'description': theItem3.description})
            theItem4 = Item.objects.get(name='Dimond Ore')
            frontInv.append({'name': theItem4.name, 'quantity': theItem4.quantity, 'max_stats': theItem4.max_stacks, 'rarity': theItem4.rarity, 'description': theItem4.description})
            theItem5 = Item.objects.get(name='Greenwood')
            frontInv.append({'name': theItem5.name, 'quantity': theItem5.quantity, 'max_stats': theItem5.max_stacks, 'rarity': theItem5.rarity, 'description': theItem5.description})
            theItem6 = Item.objects.get(name='Cedar')
            frontInv.append({'name': theItem6.name, 'quantity': theItem6.quantity, 'max_stats': theItem6.max_stacks, 'rarity': theItem6.rarity, 'description': theItem6.description})
            theItem7 = Item.objects.get(name='Spruce')
            frontInv.append({'name': theItem7.name, 'quantity': theItem7.quantity, 'max_stats': theItem7.max_stacks, 'rarity': theItem7.rarity, 'description': theItem7.description})
            theItem8 = Item.objects.get(name='Redwood')
            frontInv.append({'name': theItem8.name, 'quantity': theItem8.quantity, 'max_stats': theItem8.max_stacks, 'rarity': theItem8.rarity, 'description': theItem8.description})

        # print(resourseNeeded, 'craftItemNeeded')
        # inventory = Item.objects.all().filter(name = resourseNeeded)
        # serInv = ItemSerializer(inventory, many=True)
        # print(inventory)
    return JsonResponse({'Current Resources': frontInv})
#####################################


@api_view(['GET'])
def getEquipment(request):
    inventory = equipInventory.objects.get(user_id = request.user.id)
    data = EquipmentSerializer(inventory, many=False)
    return Response(data.data)

