import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import HandleLocation from "./HandleLocation";

function Combat({combatant}) {
  let params = useParams();

  let id = Number(params.enemy_id);

  const [character, setCharacter] = useState([]);
  const [user, setUser] = useState({});
  const [enemyBeginning, setEnemyBeginning] = useState([]);
  const [enemy, setEnemy] = useState({
    // name: "Gothmog",
    // level: 1,
    // hp: 100,
    // weaponDamage: 15,
    // strength: 2,
    // defense: 3,
    // dodge: 0,
    // dexterity: 2,
    // intelligence: 1,
    // constitution: 1,
  });
  const [userTurn, setUserTurn] = useState(null);
  const [play, setPlay] = useState(false);
  const [turn, setTurn] = useState(1);
  const [enemies, setEnemies] = useState([]);
  const [playerWon, setPlayerWon] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);
  const [maxHp, setMaxHp] = useState(0)
  const [count, setCount] = useState(0)

  // const [userFilled, setUserFilled] = useState(user.hp);
  // const [enemyFilled, setEnemyFilled] = useState(enemy.hp);

  const enemyStartHp = enemy.hp;
  const userStartHp = user.hp;

  const getCharacter = async () => {
    let myResponse = await axios.get("character/");
    let char = myResponse.data;
    console.log(char);
    // setCharacter(char)
    setMaxHp(char.hp + char.constitution * 5);
    setUser({
      name: char.name,
      id: char.id,
      level: char.level,
      weaponDamage: 30,
      strength: char.strength,
      defense: char.defense,
      dodge: char.dodge,
      dexterity: char.dexterity,
      wisdom: char.wisdom,
      constitution: char.constitution,
      hp: char.hp + char.constitution * 5,
      sprite: char.sprite,
    });
    
  };

// console.log(enemy.combat_xp)

  const getEnemies = async () => {
    let myResponse = await axios.get("enemies/");
    let data = myResponse.data["success"];
    console.log(myResponse.data["success"]);
    setEnemies(data);
    setEnemyBeginning({
      name: data[id - 1].name,
      level: data[id - 1].level,
      hp: data[id - 1].hp,
      weaponDamage: data[id - 1].base_damage,
      strength: data[id - 1].strength,
      defense: data[id - 1].defense,
      dodge: data[id - 1].dodge,
      xp: data[id - 1].combat_xp,
    });

    setEnemy({
      name: data[id - 1].name,
      level: data[id - 1].level,
      hp: data[id - 1].hp,
      weaponDamage: data[id - 1].base_damage,
      strength: data[id - 1].strength,
      defense: data[id - 1].defense,
      dodge: data[id - 1].dodge,
      xp: data[id-1].combat_xp
    });
  };




  function stopCombat() {
    setPlay(false);
    setUserTurn(null);
    updateUser()
  }
  function startCombat() {
    if (playerWon == false) {
      setPlay(true);
      setUserTurn(true);
    } else {
      setPlayerWon(false);
    }
  }

  const updateUser = async () => {
    id = user.id
    console.log(id)
    let myResponse = await axios.put(`update_xp/${id}/`, {
      xp: count
    }) 
    if (myResponse.data["update"]){
      getCharacter()
    }
  }


  function enemyHit(playerDamage) {
    let newEnemyHp = enemy.hp - playerDamage;
    if (newEnemyHp < 0) {
      newEnemyHp = 0;
    }
    if (newEnemyHp === 0) {
      setPlayerWon(true);
      console.log(`New XP => ${user.xp}`);
      console.log(`${enemy.name} IS DEFEATED`);

      // setEnemy({ ...enemy, hp: newEnemyHp });
      // setEnemy(enemyBeginning)
      // setTimeout(startCombat(), 4000)
    }

    setEnemy({ ...enemy, hp: newEnemyHp });
  }

  function playerHit(enemyDamage) {
    if (enemyDamage >= 1) {
      let newUserHp = user.hp - enemyDamage;
      if (newUserHp < 0) {
        newUserHp = 0;
      }
      if (newUserHp === 0) {
        setPlayerLost(true);
        console.log(`${user.name} IS DEFEATED`);
        setUser({ ...user, hp: newUserHp });
        return;
      }
      // setEnemyCrit(false);
      setUser({ ...user, hp: newUserHp });
    }
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
          // console.log(playerToHit);
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
        Math.random() * enemy.weaponDamage - user.defense
      );
      // console.log(enemyDamage + 1);
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

      setTurn(turn + 1);
    }
  }

  function combat() {
    if (playerWon == false && playerLost == false) {
      handleCombat();
      setUserTurn(!userTurn);
    } else if (playerLost == true) {
      updateUser()
      setPlay(false);
    } else {
      setUser({ ...user, xp: user.xp + enemy.xp });
      setCount(count + Number(enemy.xp))
      setTimeout(() => {
        setEnemy(enemyBeginning);
        setPlayerWon(false);
        handleCombat();
        setUserTurn(!userTurn);
      }, 2000);
    }
  }

  useEffect(() => {
    if (play) {
      if (user.hp > 0) {
        setTimeout(() => user.hp, 50);
        setTimeout(() => enemy.hp, 50);
        setTimeout(() => {
          combat();
        }, 500);
      }
    }
  }, [userTurn]);

  useEffect(() => {
    getCharacter();
    getEnemies();
  }, []);

  return (
    <div className="box">
      <div className="turn">Turn: {turn}</div>
      <div>---------------</div>
      <div>
        <p>Level: {enemy.level}</p>
        <h4>
          {enemy.name}: {enemy.hp}
        </h4>
      </div>
      <div>
        <div className="progressbar">
          <ProgressBar
            className="health"
            style={{
              margin: "1rem",
              backgroundColor: "red",
              width: "300px",
              height: "30px",
              border: "black solid 1px",
            }}
          >
            {/* <div className="progressPercent">
                <span>{user.hp}</span>
              </div> */}
            <ProgressBar
              now={(enemy.hp / enemyBeginning.hp) * 100}
              className="health-bar"
            />
          </ProgressBar>
        </div>
      </div>
      <br />
      <div>
        <img style={{ width: "100px" }} src={user.sprite} />
        <div>
          <p>Level: {user.level}</p>
          <p>Enemies Killed: {count}</p>
          <h5>XP:</h5>
          <div>
            <ProgressBar
              style={{
                margin: "1rem",
                backgroundColor: "white",
                width: "300px",
                height: "10px",
                border: "black solid 1px",
              }}
            >
           
              <ProgressBar className="combatXp"
              now={(count/100) * 100} />
           
            </ProgressBar>
          </div>
          <h4>
            {user.name}: {user.hp}
          </h4>
        </div>
        <div>
          <div className="progressbar">
            <ProgressBar
              className="health"
              style={{
                margin: "1rem",
                backgroundColor: "red",
                width: "300px",
                height: "30px",
                border: "black solid 1px",
              }}
            >
              <div className="progressPercent">
                {/* <span>{enemy.hp}</span> */}
              </div>
              <ProgressBar
                now={(user.hp / maxHp) * 100}
                className="health-bar"
              />
            </ProgressBar>
          </div>
        </div>

        <br />
        <div>
          <img src={user.sprite} style={{width: '10rem'}}></img>
          <div>
            <p>Level: {user.level}</p>
            <h4>
              {user.name}: {user.hp}
            </h4>
          </div>
          <div>
            <div className="progressbar">
              <ProgressBar
                className="health"
                style={{
                  margin: "1rem",
                  backgroundColor: "red",
                  width: "300px",
                  height: "30px",
                  border: "black solid 1px",
                }}
              >
                <div className="progressPercent">
                  {/* <span>{enemy.hp}</span> */}
                </div>
                <ProgressBar now={user.hp} className="health-bar" />
              </ProgressBar>
            </div>
          </div>
        </div>
        <button onClick={startCombat}>Start Combat</button>
        <button onClick={stopCombat}>Stop Combat</button>
      </div>
      <button onClick={startCombat}>Start Combat</button>
      <button onClick={stopCombat}>Stop Combat</button>
    </div>
  );
}

export default Combat;
