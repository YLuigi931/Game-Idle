import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { useState, useEffect } from 'react';


function Inventory({userStuff}) {

    const[invent,setInvent] = useState([]);
    let array = [];
    const[bag,setBag] = useState([]);

    const playerInventory = async()=>{
        let myResponse = await axios.post('myInventory/',{
            userId:userStuff,
        })
        console.log(myResponse.data.success)
        let a = myResponse.data.success
        a.forEach(function(entry) {
            console.log(entry);
            setInvent(entry);
          });
        console.log(invent)
    }
    

    useEffect(()=>{
        playerInventory()
    }, [])

    return (
        <div>
            <h1 style={{color:'white'}}> Player Inventory </h1>            
            <Row xs={1} md={2} className="box g-4" style={{margin:0}}>
                <Col md={8}>
                    <div className='box2 text-center' style={{display:'flex', width:'90%', justifyContent:'space-evenly'}}>
                        <h4>Sub Bar</h4>
                        <p>Gold: 10/1000</p>
                    </div>
                    
            <Row md={4}>
                    
                    {Array.from({ length: 10}).map((item, index)=>{
                        return(
                            <div>
                            <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                                <Card.Body>
                                    <Card.Title>Item {index+1}</Card.Title>
                                        <Card.Text>
                                            (0/0)
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })} 

                

                </Row>
                </Col>

                <Col className='box' style={{background:'rgb(66,66,92)'}} md={4}>
	
                    <h4 className='text-center'> Description Block </h4>
                    <hr/>
                
                </Col>
            </Row>
        </div>
    )
}

export default Inventory
