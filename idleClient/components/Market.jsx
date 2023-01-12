import { useState, useEffect } from 'react'

import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function Market({userStuff}) {

    const[stock,setStock] = useState([])
    
    
    const getStocks = async() =>{
        
        let response=await axios.get('market/')
        let output=response.data.success
        console.log(output)
        setStock(output)
    }

    function buy_Handler(item){
        // let response=await axios.post()
        console.log(item.name)
       
        const add_Item_to_Inventory = async()=>{
        let send= await axios.post('market/',{
            'user':userStuff,
            'itemData':item.name,
        })
        console.log(send)
        }
        {add_Item_to_Inventory()}
    }

    useEffect(()=>{
        getStocks()
    }, [])


    return (
        <div className="box g-4">
            <>{userStuff}...</>
            <h1 style={{color:'white'}}>Market</h1>
                <Accordion defaultActiveKey="0">
                        {stock.map((things)=>{
                            return(

                                <div className='box text-center pop-out-card with-transform'>
                                
                                <Accordion.Item eventKey={things.id}>
                                <Accordion.Header> {things.name} </Accordion.Header>
                                    <Accordion.Body>
                                        
                                        <h4>{things.rarity}</h4>
                                        <hr/>
                                        <p>{things.description}</p>
                                        <Button type='submit' onClick={()=> buy_Handler(things)} variant="primary">Add to Inventory</Button>
                                    </Accordion.Body>
                                </Accordion.Item>
                               
                                </div>

                            )
                        })}
                </Accordion>
        </div>
    )
}

export default Market
