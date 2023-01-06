import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Combat() {

    const [character, setCharacter] = useState([]);
    const [user, setUser] = useState({})

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
    const [userCrit, setUserCrit] = useState(false);
    const [enemyCrit, setEnemyCrit] = useState(false);
   
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
          hp: 100 + (char.constitution * 5)
        });
        
    };

console.log(user)

    function stopCombat() {
      setPlay(false);
      setUserTurn(null);
      setIsRunning(true);
    }
    function startCombat() {
      setPlay(true);
      setUserTurn(true);
      setIsRunning(false);
    }


    function enemyHit(playerDamage) {
      let newEnemyHp = enemy.hp - playerDamage;
      if (newEnemyHp < 0) {
        newEnemyHp = 0;
      }
      if (newEnemyHp === 0) {
        console.log(`${enemy.name} IS DEFEATED`);
        setEnemy({ ...enemy, hp: newEnemyHp });
      }
      setUserCrit(false);
      setEnemy({ ...enemy, hp: newEnemyHp });
    }

    function playerHit(enemyDamage) {
      let newUserHp = user.hp - enemyDamage;
      if (newUserHp < 0) {
        newUserHp = 0;
      }
      if (newUserHp === 0) {
        console.log(`${user.name} IS DEFEATED`);
        setUser({ ...user, hp: newUserHp });
        return;
      }
      setEnemyCrit(false);
      setUser({ ...user, hp: newUserHp });
    }

    function handleCombat() {

//--------------------USER TURN----------------------------------------
      if (userTurn === true) {
        let playerToHit = Math.floor(Math.random() * 50);
        let playerDamage = Math.floor(
          Math.random() * (user.weaponDamage + user.strength) - enemy.defense
        );
        console.log(`USER damage before crit: ${playerDamage}`);

//-----------check to see if user hits enemy---------------------------
        if (playerToHit >= enemy.dodge + 15) {
          if (playerToHit >= 45 - user.dexterity && playerDamage > 0) {
            console.log("USER CRITICAL HIT");
            playerDamage = playerDamage * 2;
          }
          console.log(`USER damage after crit: ${playerDamage}`);

          if (playerDamage >= 1) {
            console.log(playerToHit);
            enemyHit(playerDamage);
          }
        } else {
          console.log("PLAYER MISSED!");
        }
      }

//--------------------------ENEMY TURN------------------------------------------
      if (userTurn === false) {
        let enemyToHit = Math.floor(Math.random() * 50);
        let enemyDamage = Math.floor(
          Math.random() * (enemy.weaponDamage + enemy.strength) - user.defense
        );
        console.log(`ENEMY damage before crit: ${enemyDamage}`);

//-----------check to see if enemy hits user------------------------
        if (enemyToHit >= user.dodge + 15) {
          if (enemyToHit >= 45 - enemy.dexterity && enemyDamage > 0) {
            console.log("ENEMY CRITICAL HIT");
            enemyDamage = enemyDamage * 2;
          }
          console.log(`ENEMY damage after crit: ${enemyDamage}`);

          if (enemyDamage >= 1) {
            playerHit(enemyDamage);
          }
        } else {
          playerHit(enemyDamage);
          console.log("ENEMY MISSED!");
        }
      }
      setTurn(turn + 1);
    }

    function combat() {
      handleCombat();
      setUserTurn(!userTurn);
    }

    useEffect(() => {
    
      if (play) {
        if (user.hp > 0 && enemy.hp > 0) {
          setTimeout(() => user.hp, 50);
          setTimeout(() => enemy.hp, 50);
          setTimeout(() => {
            combat();
          }, 500);
        }
      }
    }, [userTurn]);

    useEffect(()=> {
        getCharacter()
    },[])



    return (
      <div className="box">
        <button onClick={startCombat}>Start Combat</button>
        <button onClick={stopCombat}>Stop Combat</button>
        <div>Turn: {turn}</div>
        <div>---------------</div>
        <div>
          <p>Level: {user.level}</p>
          {user.name}: {user.hp}
        </div>
        <div>
          <div className="progressbar">
            <div
              style={{
                height: "100%",
                width: `${user.hp}`,
                backgroundColor: "green",
                transition: "width",
              }}
            ></div>

            <span className="progressPercent">{user.hp}</span>
          </div>
        </div>
        <br />
        <div>
          <p>Level: {enemy.level}</p>
          {enemy.name}: {enemy.hp}
        </div>
        <div>

          <div className="progressbar">
            <div
              style={{
                height: "100%",
                width: `${enemy.hp}`,
                backgroundColor: "green",
                transition: "width 0.5s linear",
              }}
            ></div>

            <span className="progressPercent">{enemy.hp}</span>
          </div>
        </div>
      </div>
    );

}

export default Combat;
