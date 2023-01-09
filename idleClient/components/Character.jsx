import axios from 'axios'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Character({character}){

    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '3rem',
        }}>

    <Card style={{ width: '20rem', paddingTop:'.5rem'}}>
      <Card.Img variant="top" src={character && character.sprite} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>
        <ListGroup horizontal>
        <ListGroup.Item><h6>{character.class_type }</h6></ListGroup.Item>
        <ListGroup.Item>level: {character.level}</ListGroup.Item>
        <ListGroup.Item>XP: {character.xp}</ListGroup.Item>
        <ListGroup.Item>HP: {character.hp }</ListGroup.Item>
        </ListGroup>

        <ListGroup>
        <ListGroup className="d-flex justify-content-center align-items-center">Battle Stats</ListGroup>
        <ListGroup.Item  className="d-flex justify-content-between align-items-start">
            <h6>Attack</h6> {character.attack}
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <h6>Defense</h6>{character.defense}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>Dodge</h6>{character.dodge}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>Crit Chance</h6>{character.crit_chance}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>Strength</h6>{character.strength}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>dexterity</h6>{character.dexterity}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>Wisdom</h6>{character.wisdom}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>Speed</h6>{character.speed}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <h6>constitution</h6>{character.constitution}</ListGroup.Item>
        <hr></hr>
        
           </ListGroup>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

        </div>

    )
}
export default Character
