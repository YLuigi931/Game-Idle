import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Inventory() {
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
                
                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (3/5)
                        </Card.Text>
                    </Card.Body>
                </Card>
                

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (1/5)
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (1/1)
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (10/20)
                        </Card.Text>
                    </Card.Body>
                </Card>
            
                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (3/5)
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (1/5)
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (1/1)
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='text-center pop-out-card with-transform'style={{ width: '8rem', margin:'10px'}}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            (10/20)
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Row>
            </Col>

            <Col className='box2' md={4}>
                <h4 className='text-center'> Description Block </h4>
                <hr/>
               
            </Col>
	    </Row>
    </div>
  )
}

export default Inventory