import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';

function Market() {

    const[stock,setStock] = useState([])
    // const params = useParams()

    const getStocks = async() =>{
        let response=await axios.get('market/')
        let output=response.data.success
        console.log(output)
        setStock(output)
    }

    useEffect(()=>{
        getStocks()
    }, [])


    return (
        <div className="box g-4">
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