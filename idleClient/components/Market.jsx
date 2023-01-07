import { useState, useEffect } from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';

function Market() {

    const[stock,setStock] = useState([])

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
        <div>
            <h1 style={{color:'white'}}>Market</h1>
            <Row xs={1} md={4} className="box g-4" style={{margin:10}}>
                <Col md={8}>
                    <Row md={4} style={{justifyContent:'space-evenly'}}>
                        {stock.map((things)=>{
                            return(

                                <div>
                                <Card className='text-center pop-out-card with-transform'style={{ width: '25rem', margin:'50px'}}>
                                    <Card.Body>
                                        <Card.Title>{things.name}</Card.Title>
                                        <Card.Text>
                                            {things.rarity}...{things.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </div>

                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Market