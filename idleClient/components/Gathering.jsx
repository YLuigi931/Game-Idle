import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';






function Gathering(){

    const [popUp, setPopUp] = useState(false)
	const [fill, setFill] = useState(1)
    const [xp, setxp] = useState(0)
    const [idleClock, setIdleClock] = useState(2)
    const [gatheredType, setGatheredType] = useState(null)
    const [catagory, setCatagory] = useState('')
    const [active, setActive] = useState(false)
    const [character, setCharacter] = useState([]);
    let timer;

    const [show, setShow] = useState(false);
    const target = useRef(null);

// console.log(character)

const getCharacter=async()=>{
    let myResponse=await axios.get('character/')
    let char= myResponse.data
    // console.log(char)
    setCharacter(char)
  }

 function upgradeCharacter(){
    // fishing_xp = fishing_xp
    // harvesting_xp = fishing_xp
    // logging_xp = fishing_xp
    
    if (catagory=='mining'){
        let mining_xp = xp
        console.log(mining_xp)
        let myResponse = axios.put('character/', {'mining_xp': mining_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
    if (catagory=='fishing'){
        let fishing_xp = xp

        let myResponse = axios.put('character/', {'fishing_xp': fishing_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
    if (catagory=='harvesting'){
        let harvesting_xp = xp

        let myResponse = axios.put('character/', {'harvesting_xp': harvesting_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
    if (catagory=='logging'){
        let logging_xp = xp

        let myResponse = axios.put('character/', {'logging_xp': logging_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
 }

 //add gathered item to invatory ----------

   function addItem(){
        let item = gatheredType
    let myResponse = axios.post('addGatheringItem/',{
        'item': item
    })
    console.log(myResponse)
   }


    function gathered(){
        setFill(prev => prev += 1)
        setPopUp(true)
        setTimeout(()=>setPopUp(false), ((1000)))
        upgradeCharacter()
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

    const renderTooltip1 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          5000 XP Required
        </Tooltip>
      );
      const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          15000 XP Required
        </Tooltip>
      );
      const renderTooltip3 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          25000 XP Required
        </Tooltip>
      );

      const renderPopUp = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          +1 {gatheredType} ({fill})
        </Tooltip>
      );

	useEffect(()=>{
        getCharacter()
        if (active) {
              idleGathering()
              addItem()
          }
        }, [fill, active]);

    useEffect(()=>{
        getCharacter()
    },[fill])

    return(
        <div style={{margin:'1rem' }} >
      
      {popUp?
      <ToastContainer  position="bottom-end" show={popUp} className="p-1"  autohide>
        <Toast bg={'warning'}>
          <Toast.Body>+1 {gatheredType} ({fill})</Toast.Body>
        </Toast>
      </ToastContainer>
      :<></>
        }
      

        {(gatheredType == null) ? <div className='box2'><h5 className=''> Start Gathering {gatheredType}</h5></div> :

                <div 
                aria-live="polite"
        aria-atomic="true"
        className="box2 position-relative" style={{margin:'1rem', minHeight: '240px' }}>

                <h5 className=''> Start Gathering {gatheredType}</h5>

                <Row style={{justifyContent:'center'}}>
                <Button style={{margin: '.3rem', width: '10rem'}}  id='start' variant="outline-success" 
                onClick={startGathering}>Start</Button>
                </Row>

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
                    action onClick={()=>{setCatagory('fishing'), setGatheredType('pond fish'), setIdleClock(1.5), setxp(10), stopGathering()} }>Pond</ListGroup.Item>}


                    {character.fishing_xp >= 5000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('fishing'), setGatheredType('river fish'), setIdleClock(2.2), setxp(15), stopGathering()}}>River</ListGroup.Item>
                     :
                     
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                     
                    }
                    
                    {character.fishing_xp >= 15000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('fishing'), setGatheredType('lake fish'), setIdleClock(3.2), setxp(35), stopGathering()}}>Lake</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip2}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.fishing_xp >= 25000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('fishing'), setGatheredType('ocean fish'), setIdleClock(4.2), setxp(75), stopGathering()}}>Ocean</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip3}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Fishing XP: {character.fishing_xp}
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
                    action onClick={()=>{setCatagory('harvesting'), setGatheredType('wheat'), setIdleClock(2.5), setxp(10), stopGathering()} }>Wheat</ListGroup.Item>}


                    {character.harvesting_xp >= 5000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('harvesting'),setGatheredType('corn'), setIdleClock(3.2), setxp(15), stopGathering()}}>Corn</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.harvesting_xp >= 15000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('harvesting'), setGatheredType('potato'), setIdleClock(4.2), setxp(25), stopGathering()}}>Potato</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.harvesting_xp >= 25000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('harvesting'), setGatheredType('strawberry'), setIdleClock(5.2), setxp(50), stopGathering()}}>Strawberry</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current harvesting XP: {character.harvesting_xp}
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
                    action onClick={()=>{setCatagory('logging'), setGatheredType('green wood'), setIdleClock(2.5), setxp(10), stopGathering()} }>Green Wood</ListGroup.Item>}


                    {character.logging_xp>= 5000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('logging'), setGatheredType('cedar'), setIdleClock(3.2), setxp(15), stopGathering()}}>Cedar</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.logging_xp >= 15000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('logging'), setGatheredType('spruce'), setIdleClock(4.2), setxp(25), stopGathering()}}>Spruce</ListGroup.Item>
                     :
                     <OverlayTrigger
                     placement="top"
                     delay={{ show: 250, hide: 400 }}
                     overlay={renderTooltip1}
                    >
                    <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                    action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.logging_xp >= 25000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('logging'), setGatheredType('redwood'), setIdleClock(5.2), setxp(50), stopGathering()}}>RedWood</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Logging XP: {character.logging_xp}
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
                    action onClick={()=>{setCatagory('mining'), setGatheredType('copper'), setIdleClock(2.5), setxp(10), stopGathering()} }>Copper</ListGroup.Item>}


                    {character.mining_xp >= 5000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('mining'), setGatheredType('iron'), setIdleClock(3.2), setxp(15), stopGathering()}}>Iron</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.mining_xp >= 15000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('mining'), setGatheredType('gold'), setIdleClock(4.2), setxp(25), stopGathering()}}>Gold</ListGroup.Item>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip2}
                    >
                     <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                     action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                    
                    {character.mining_xp >= 25000? <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setCatagory('mining'), setGatheredType('Dimond'), setIdleClock(5.2), setxp(50), stopGathering()}}>Dimond</ListGroup.Item>
                     :
                     <OverlayTrigger
                     placement="top"
                     delay={{ show: 250, hide: 400 }}
                     overlay={renderTooltip3}
                    >
                    <ListGroup.Item style={{margin: '.2rem', textAlign: 'center' }} variant='danger'
                    action ref={target} onClick={() => setShow(!show)}>LOCKED</ListGroup.Item>
                    </OverlayTrigger>
                    }
                </ListGroup>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                Current Mining XP: {character.mining_xp}
            </Card.Footer>
            </Card>
        </Col>

     </Row>
    </div>
    )
}
export default Gathering