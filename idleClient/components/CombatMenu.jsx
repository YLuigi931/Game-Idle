import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';
import HandleLocation from './HandleLocation';

function CombatMenu() {

    const [character, setCharacter] = useState([]);
    const [user, setUser] = useState({});

    const [enemy, setEnemy] = useState({
      name: "Gothmog",
      level: 1,
      hp: 100,
      weaponDamage: 15,
      strength: 2,
      defense: 3,
      dodge: 0,
      dexterity: 2,
      intelligence: 1,
      constitution: 1,
    });
    const [userTurn, setUserTurn] = useState(null);
    const [play, setPlay] = useState(false);
    const [turn, setTurn] = useState(1);
    const [isRunning, setIsRunning] = useState(false);


    const [locations, setLocations] = useState([])
    const [enemies, setEnemies] = useState([]);


    // const [userFilled, setUserFilled] = useState(user.hp);
    // const [enemyFilled, setEnemyFilled] = useState(enemy.hp);

    const enemyStartHp = enemy.hp;
    const userStartHp = user.hp;

    const getCharacter = async () => {
      let myResponse = await axios.get("character/");
      let char = myResponse.data;
      console.log(char);
      // setCharacter(char)
      setUser({
        name: char.name,
        level: char.level,
        weaponDamage: 30,
        strength: char.strength,
        defense: char.defense,
        dodge: char.dodge,
        dexterity: char.dexterity,
        wisdom: char.wisdom,
        constitution: char.constitution,
        hp: 100 + char.constitution * 5,
        sprite: char.sprite,
      });
    };

    const getEnemies = async () => {
      let myResponse = await axios.get("enemies/");
      let data = myResponse.data["success"];
      console.log(myResponse.data["success"]);
      setEnemies(data);
    };


    const getLocations = enemies.filter(enemy => {
        if (!locations.includes(enemy.location)) {
            setLocations([...locations, enemy.location])        
        }
    })
    





    useEffect(() => {
      getCharacter();
      getEnemies();
    }, []);

  return (
    <div>
      <div className="box">
        {locations && 
        locations.map((location) => (
            <HandleLocation
            enemies = {enemies}
            setEnemies= {setEnemies}
            locations = {locations}
            location = {location}
            />
        

            ))}
          
       
      </div>
    </div>
  );
}

export default CombatMenu
