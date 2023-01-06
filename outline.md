

### Idle Game

 - A turn-based game where a user can create a character, fight battles, craft materials, and level up 

## Login / Account Page

    - sign up
      - sign up section should take in a validate an email and password
    - login 
      - login section should take in a valid username(or email) and password
    - account details
      - name
        - edit
      - email
        - edit
      - character page
        - create
          - edit name
          - delete
      - delete account


## Home Page

- display character information
  - level
  - race
  - class
  - stats
    - strength
    - dodge
    - attack
    - defense
    - crafting
      - Smithing Level
      - Cooking Level
  
  - equipped items
    - weapon
      - attack
    - armor
      - head
        - defense    
      - chest
        - defense     
      - legs
        - defense       
      - hands
        - defense
        
    - accessory slot
      - food
      - (stretch goal) enchantments

    - (stretch goal)
      - weapons, armor, and materials can be sold to a vendor for currency

## Combat Page

- each user should be able to fight battles on command
  - enemy display
    - stats
      - enemy type
      - enemy level
      - armor
      - damage
      - health
  - user display
    - stats
      - level
      - armor
      - damage
      - health
  - fight button
    - initiates fight between user and enemy
  - flee
    - attempts to flee from battle and finds a new enemy

## Tradeskill / Crafting Page

- Each member should be able to gather resources
  - wood gathering
  - fishing
  - mining
  - farming

- Each member should be able to use resources to craft materials
  - Weapons
  - Armor
  - Cooking

  - Crafting
    - each crafting discipline has a level that grows as the user crafts more materials
    - each crafting level gained adds + 1 to that materials stat when crafted
      - example..
        - Smithing (level 1)
          - helmet
            - +1 defense
        - Smithing (level 2)
          - helmet
            - +2 defense
          
    - each type of item should require two resources to be crafted
      - smithing (armor/weapons)
        - mining/wood gathering
      - cooking
        - fishing/wood gathering



## Combat System

  - Turn-based combat
  
    - Enemy Levels should be scaled with player level

    - Weapons
      - each combatant will roll to see if they hit (randint 1-20).
        - base roll for a hit is 8
          - dodge modifier adds to the hit value 
            - ex.
              - if it takes an 8 to hit and your character has a +3 dodge then it takes an 11 to hit
            
      - each weapon will have a damage range (like a dice roll D8, D6, D4 etc...)
      - actual damage inflicted will be a simple equation of (weapon damage + strength modifier) - defense points)
        - if defense points are higher than weapon damage, damage output defaults to 1
      - (stretch goal) - crit
        - if a combatant rolls a 20 to hit, it is a critical hit
          - the subsequent damage roll will be doubled (((weapon damage x 2) + strength modifier) - defense points)

    - Armor 
      - Armor will supplement a character's defense value. 
        - Each armor piece will have a defense stat
          - total defense is the sum of all armor amounts

    - Accessory slot
      - if equipped
        - healing (food)
          - automatically applied at 20% health
          - healing uses 1 turn