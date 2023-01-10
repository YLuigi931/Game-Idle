import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Combat from './Combat';


function HandleLocation({location, locations, enemies, setEnemies}) {
const [expand, setExpand] = useState(false);
const [enemiesByLoc, setEnemiesByLoc] = useState([])
const [combatant, setCombatant] = useState([])
const [showFight, setShowFight] = useState(false)

const navigate = useNavigate()



const navToCombat = (e, enemy) => {
    e.preventDefault()
    console.log(enemy)
    setCombatant(enemy)
    navigate({
        pathname: `/Combat/${enemy.id}`,

    })
}



  return (
    <div className="location">
      {location}
      <button onClick={() => setExpand(!expand)}>
        {expand ? "Cancel" : "Select"}
      </button>
      {expand ? (
        <div>
          {enemies
            .filter((enemy) => enemy.location == location)
            .map((filteredEnemy) => (
                
              <div>
                {/* <Link to={{
                    pathname: "./Combat",
                    state:{combatant}
                
            }}
            onClick={() => setCombatant(filteredEnemy)}
            >{filteredEnemy.name}</Link> */}

                <a href='#' onClick={(e)=>navToCombat(e, filteredEnemy)}>{filteredEnemy.name}</a>
 
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default HandleLocation
