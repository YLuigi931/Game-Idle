import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { useState, useEffect } from 'react';


function Inventory({userStuff}) {

    const[bag,setBag] = useState([]);
    const[desc, setDesc] = useState(null);

    const checkInv = async()=>{
	    let Response = await axios.get('getInventory/')
	    setBag(Response.data.thing)
	    console.log(Response.data)
    }

    

    useEffect(()=>{
	checkInv()
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
                    
                    {bag.map((item, index)=>{
                        return(
                            <div>
                            <Card onClick={()=>setDesc(item.description)} className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            ({item.quantity}/{item.max_stats})
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
	      	    {desc}
                
                </Col>
            </Row>
        </div>
    )
}

export default Inventory
