import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';


function NewCharacter(){

    const [selectedChar, setSelectedChar]= useState({})

    let assassianClass = {   
        type: 'Assassin',
        base_attack:  5,
        base_defense: 1,
        base_dodge: 2,
        base_crit: 2,
        sprite: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/a547a4e46f4de6d.png'
        }
    let BarbarainClass = {   
        type: 'Barbarain',
        base_attack:  4,
        base_defense: 5,
        base_dodge: 0,
        base_crit:1,
        sprite: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/84da3e6c5dbb439.png'
        }
    let wizardClass = {   
        type: 'Wizard',
        base_attack:  6,
        base_defense: 0,
        base_dodge: 1,
        base_crit:3,
        sprite: ' https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/3c7f268599eb477.png'
        }
    let RangerClass = {   
        type: 'Ranger',
        base_attack:  6,
        base_defense: 2,
        base_dodge: 1,
        base_crit:1,
        sprite: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/6d56e7777c3ce43.png'
        }
    let SoldierClass = {   
        type: 'Soldier',
        base_attack:  3,
        base_defense: 3,
        base_dodge: 2,
        base_crit:2,
        sprite: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/35338ed4dca7e8e.png'
        }

   const addNewCharacter=async()=>{
    let CharacterName = document.getElementById("characterName").value
    let sprite = selectedChar.sprite
    let class_type = selectedChar.type
    let attack = selectedChar.base_attack
    let defense =  selectedChar.base_defense
    let dodge = selectedChar.base_dodge
    let crit_chance =  selectedChar.base_crit

    let myResponse = await axios.post('character/',{
        'name': CharacterName,
        'sprite': sprite,
        'class_type': class_type,
        'attack': attack,
        'defense': defense,
        'dodge': dodge,
        'crit_chance': crit_chance,
    })
    console.log(myResponse)
    if(myResponse.data['new_character']==true){
        window.location.href="/"
    }
    }

    useEffect(()=>{
        console.log(selectedChar)
    }, [selectedChar])
    

    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '3rem',
        }}>

<Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={selectedChar.sprite || '' } />
      <Card.Body>
        <Card.Title>Create Character</Card.Title>
        <Card.Text>
        
        <Form onSubmit={''}>
      <FloatingLabel controlId="characterName" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>
      <h4>Attack: {selectedChar.base_attack}</h4>
      <h4>Defense: {selectedChar.base_defense}</h4>
      <h4>Dodge: {selectedChar.base_dodge}</h4>
      <h4>Crit: {selectedChar.base_crit}</h4>

    <Button onClick={()=>setSelectedChar(assassianClass)}  className='assassain_btn'>Assassain</Button>
    <Button onClick={()=>setSelectedChar(BarbarainClass)}  className='assassain_btn'>Barbarian</Button>
    <Button onClick={()=>setSelectedChar(wizardClass)}  className='assassain_btn'>Wizard</Button>
    <Button onClick={()=>setSelectedChar(RangerClass)}  className='assassain_btn'>Ranger</Button>
    <Button onClick={()=>setSelectedChar(SoldierClass)}  className='assassain_btn'>Soldier</Button>
	</Form>	

        </Card.Text>
        <Button onClick={addNewCharacter} className='input-group-append'>Save</Button>
      </Card.Body>
    </Card>


        </div>
    )
}
export default NewCharacter