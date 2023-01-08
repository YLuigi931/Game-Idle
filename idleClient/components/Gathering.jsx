import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
// import Popup from 'reactjs-popup';






function Gathering({character}){

    const [popUp, setPopUp] = useState(false)
	const [fill, setFill] = useState(1)
    const [xp, setxp] = useState(1)
    const [idleClock, setIdleClock] = useState(2)
    const [gatheredType, setGatheredType] = useState(null)
    const [active, setActive] = useState(false)
    let timer;

    function gathered(){
        setFill(prev => prev += 1)
        setPopUp(true)
        setTimeout(()=>setPopUp(false), ((1000)))
        console.log(fill)
        console.log(gatheredType)
    }
    function idleGathering(){
        
        if(!timer){
        timer = setTimeout(()=>gathered(), (idleClock*1000));
        }
    }

    function startGathering(){
        setActive(true)
    }

    function stopGathering(){
        setActive(false)
        setPopUp(false)
        clearTimeout(timer);
        timer = null
    }

	useEffect(()=>{
        if (active) {
              idleGathering()
          }
        }, [fill, active]);


    return(
        <div style={{margin:'1rem'}} >
        {(gatheredType == null) ? <div className='box2'><h5 className=''> Start Gathering {gatheredType}</h5></div> :

                <div className='box2'>

                <h5 className=''> Start Gathering {gatheredType}</h5>
                <Row style={{justifyContent:'center'}}>
                <Button style={{margin: '.3rem', width: '10rem'}}  id='start' variant="outline-success" 
                onClick={startGathering}>Start</Button>

                {/* If we want a stop button */}

                {/* <Button style={{margin: '.3rem', width: '10rem'}} id='stop' variant="outline-danger" 
                onClick={stopGathering}>Stop</Button> */}

                {/* If we want a stop button */}

                </Row>

                {popUp? <Badge pill bg="outline-success"> +1 {gatheredType} ({fill}) </Badge>:<div style={{margin: '1rem'}}></div>}

                <ProgressBar style={{margin: '1rem'}}>
                    {active ?<ProgressBar style={{animationDuration:`${idleClock}s`}} className='progress-bar' />: <></>}
                </ProgressBar>

                <Badge style={{margin:'.5rem'}} pill bg="warning">XP: {xp}</Badge>
                <Badge style={{margin:'.5rem'}} pill bg="warning">Time: {idleClock}'s</Badge>

                </div>
            }   
    <Row  xs={2} xxl={4} lg={3} className="g-4">
      
        <Col>
            <Card className='card'>
            <Card.Body>
            <Card.Title>Fishing</Card.Title>
            <Card.Text>
                <ListGroup style={{ maxWidth: '10rem', margin:'1rem' }}   >

                    {<ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='light' 
                    action onClick={()=>{setGatheredType('pond fish'), setIdleClock(2.5), setxp(10), stopGathering()} }>Pond</ListGroup.Item>}


                    {character.fishing >= 5? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('river fish'), setIdleClock(3.2), setxp(15), stopGathering()}}>River</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 5 Fishing</ListGroup.Item>
                    }
                    
                    {character.fishing >= 15? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Lake fish'), setIdleClock(4.2), setxp(25), stopGathering()}}>Lake</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 15 Fishing</ListGroup.Item>
                    }
                    
                    {character.fishing >= 25? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Ocean fish'), setIdleClock(5.2), setxp(50), stopGathering()}}>Ocean</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 25 Fishing</ListGroup.Item>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Level: {character.fishing}
            </Card.Footer>
            </Card>
        </Col>
        <Col>
            <Card className='card'>
            <Card.Body>
            <Card.Title>Harvesting</Card.Title>
            <Card.Text>
                <ListGroup style={{ maxWidth: '10rem', margin:'1rem' }}   >

                    {<ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='light' 
                    action onClick={()=>{setGatheredType('wheat'), setIdleClock(2.5), setxp(10), stopGathering()} }>Wheat</ListGroup.Item>}


                    {character.harvesting >= 5? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('corn'), setIdleClock(3.2), setxp(15), stopGathering()}}>Corn</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 5 Fishing</ListGroup.Item>
                    }
                    
                    {character.harvesting >= 15? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('potato'), setIdleClock(4.2), setxp(25), stopGathering()}}>Potato</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 15 Fishing</ListGroup.Item>
                    }
                    
                    {character.harvesting >= 25? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('strawberry'), setIdleClock(5.2), setxp(50), stopGathering()}}>Strawberry</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 25 Fishing</ListGroup.Item>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Level: {character.harvesting}
            </Card.Footer>
            </Card>
        </Col>
        <Col>
            <Card className='card'>
            <Card.Body>
            <Card.Title>Logging</Card.Title>
            <Card.Text>
                <ListGroup style={{ maxWidth: '10rem', margin:'1rem' }}   >

                    {<ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='light' 
                    action onClick={()=>{setGatheredType('green wood'), setIdleClock(2.5), setxp(10), stopGathering()} }>Green Wood</ListGroup.Item>}


                    {character.logging>= 5? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('cedar'), setIdleClock(3.2), setxp(15), stopGathering()}}>Cedar</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 5 Fishing</ListGroup.Item>
                    }
                    
                    {character.logging >= 15? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('spruce'), setIdleClock(4.2), setxp(25), stopGathering()}}>Spruce</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 15 Fishing</ListGroup.Item>
                    }
                    
                    {character.logging >= 25? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('redwood'), setIdleClock(5.2), setxp(50), stopGathering()}}>RedWood</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 25 Fishing</ListGroup.Item>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Level: {character.logging}
            </Card.Footer>
            </Card>
        </Col>
        <Col>
            <Card className='card'>
            <Card.Body>
            <Card.Title>Mining</Card.Title>
            <Card.Text>
                <ListGroup style={{ maxWidth: '10rem', margin:'1rem' }}   >

                    {<ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='light' 
                    action onClick={()=>{setGatheredType('copper'), setIdleClock(2.5), setxp(10), stopGathering()} }>Copper</ListGroup.Item>}


                    {character.mining >= 5? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('iron'), setIdleClock(3.2), setxp(15), stopGathering()}}>Iron</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 5 Mining</ListGroup.Item>
                    }
                    
                    {character.mining >= 15? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('gold'), setIdleClock(4.2), setxp(25), stopGathering()}}>Gold</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 15 Mining</ListGroup.Item>
                    }
                    
                    {character.mining >= 25? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Dimond'), setIdleClock(5.2), setxp(50), stopGathering()}}>Dimond</ListGroup.Item>
                     :
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action >Unlock at Level 25 Mining</ListGroup.Item>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Level: {character.mining}
            </Card.Footer>
            </Card>
        </Col>

     </Row>
    </div>
    )
}
export default Gathering