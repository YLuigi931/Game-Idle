import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Combat from './Combat';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
  <div style={{margin: "2rem"}} >
      <Card
        onClick={() => setExpand(!expand)}
        className="text-center pop-out-card with-transform"
        style={{ width: "15rem", margin: "10px" }}
      >
        <h4>{location}</h4>
        <Button variant='outline-warning' onClick={() => setExpand(!expand)}>
          {expand ? "Cancel" : "Select"}
        </Button>
          {expand ? (
            <div>
              <Col>
                {enemies
                  .filter((enemy) => enemy.location == location)
                  .map((filteredEnemy) => (
                    <Row>
                      <h5>
                        <a
                          href="#"
                          onClick={(e) => navToCombat(e, filteredEnemy)}
                        >
                          {filteredEnemy.name}
                        </a>
                      </h5>
                    </Row>
                  ))}
              </Col>
            </div>
          ) : null}
      </Card>
    </div>
  );
}
export default HandleLocation


