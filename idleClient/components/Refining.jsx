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





function Refining(){

    const [popUp, setPopUp] = useState(false)
	const [fill, setFill] = useState(1)
    const [xp, setxp] = useState(0)
    const [idleClock, setIdleClock] = useState(2)
    const [gatheredType, setGatheredType] = useState(null)
    const [catagory, setCatagory] = useState('')
    const [active, setActive] = useState(false)
    const [character, setCharacter] = useState([]);
	const [needResource, setNeedResource] = useState('')
	const [copper, SetCopper] = useState(null)
	const [iron, setIron] = useState(null)
	const [gold, SetGold] = useState(null)
	const [dimond, SetDimond] = useState(null)
	const [greenwood, SetGreenwood] = useState(null)
	const [cedar, SetCedar] = useState(null)
	const [spruce, SetSpruce] = useState(null)
	const [redwood, SetRedwood] = useState(null)
    // const [timer, setTimer] = useState(false);
    // const [timer2, setTimer2] = useState(false);
    let timer;
    let timer2;

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
    console.log(xp)
    if (catagory=='Smelting'){
        let smelting_xp = xp
        let myResponse = axios.put('character/', {'smelting_xp': smelting_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
    if (catagory=='Wood Working'){
        let wood_working_xp = xp
        let myResponse = axios.put('character/', {'wood_working_xp': wood_working_xp}).then(response=>{
            let data = response.data
            console.log(data)
        })
    }
    }
 

 //add gathered item to invatory ----------

   function addItem(){
    console.log(timer,timer2)
        let item = gatheredType
    let myResponse = axios.post('addGatheringItem/',{
        'item': item
    })
    // console.log(myResponse)
   }

   const checkItem=async()=>{
	const getInventory=await axios.get('craftItem/').then(request=>{ //+resourceNeeded+'/'
		let data = request.data
		SetCopper(data['Current Resources'][0])
		setIron(data['Current Resources'][1])
		SetGold(data['Current Resources'][2])
		SetDimond(data['Current Resources'][3])
		SetGreenwood(data['Current Resources'][4])
		SetCedar(data['Current Resources'][5])
		SetSpruce(data['Current Resources'][6])
		SetRedwood(data['Current Resources'][7])
	})
	// console.log(getInventory)
   }


    function gathered(){
		console.log(copper)
        setFill(prev => prev += 1)
        setPopUp(true)
        setTimeout(()=>setPopUp(false), ((1000)))
        upgradeCharacter()
		
    }
    function idleGathering(){
        
        if(!timer){
        timer = setTimeout(()=>gathered(), idleClock*1000);
        }
        if(!timer2){
            timer2 = setTimeout(()=>addItem(), idleClock*1000);
            }
    }

    function startGathering(){
        setActive(true)
    }

	function stopGathering(){
        clearTimeout(timer);
        clearTimeout(timer2)
        timer = null
        timer2 = null
        setActive(false)
        setPopUp(false)
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
          }
        }, [fill, active]);

    useEffect(()=>{
        getCharacter()
		checkItem()
    },[fill])


    return(
        <div>

        {popUp?
      <ToastContainer  position="bottom-end" show={popUp} className="p-1"  autohide>
        <Toast bg={'warning'}>
          <Toast.Body>+1 {gatheredType} ({fill})</Toast.Body>
        </Toast>
      </ToastContainer>
      :<></>
        }
      
		<Row md={8} className='box2'>
		<Col ><Button onClick={()=>{setCatagory('Smelting'), setGatheredType(null)}} variant="dark" >Smelting</Button></Col>
		<Col ><Button onClick={()=>{setCatagory('Wood Working'), setGatheredType(null)}} variant="dark">Wood Working</Button></Col>

		</Row>
        {(gatheredType == null) ? <div className='box2'><h5 className=''> Start Refining {gatheredType}</h5></div> :

                <div 
                aria-live="polite"
        aria-atomic="true"
        className="box2 position-relative" style={{margin:'1rem', minHeight: '240px' }}>

                <h5 className=''>{catagory} {gatheredType}</h5>
			
			{ ///pulledResourceItem == null ? <p>select Item</p>:
				//pulledResourceItem[0].quantity > 0 ?
                <Row style={{justifyContent:'center'}}>
                <Button style={{margin: '.3rem', width: '10rem'}}  id='start' variant="outline-success" 
                onClick={()=>{startGathering()}}>Start</Button>
                </Row>
				//:<p>Need needResource</p>
			}

        
				{catagory == "Smelting" ? <Badge style={{margin:'.5rem'}} pill bg="success"> Current Smelting XP: {character.smelting_xp}</Badge> 
				:catagory == "Wood Working" ?<Badge style={{margin:'.5rem'}} pill bg="success"> Current Wood Working XP: {character.wood_working_xp}</Badge>: null}
                <ProgressBar style={{margin: '1rem'}}>
                    {active ?<ProgressBar style={{animationDuration:`${idleClock}s`}} className='progress-bar' />: <></>}
                </ProgressBar>

                <Badge style={{margin:'.5rem'}} pill bg="warning">XP: {xp}</Badge>
                <Badge style={{margin:'.5rem'}} pill bg="warning">Time: {idleClock}'s</Badge>
                </div>
            } 
  
    		{catagory == "Smelting" ? 
			
			<Row className="box2 g-4" style={{ justifyContent:'space-evenly'}} >
 
                    {  
					<Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='light' 
                    	action onClick={()=>
						{setGatheredType('Copper Bar'), setIdleClock(1.5), setxp(10),setNeedResource('Copper Ore'), stopGathering()} 
						}>
						<Badge style={{margin:'.5rem'}} pill bg="success">Copper Bar</Badge>
					</Col>
					}


                    {character.smelting_xp >= 5000? <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Iron Bar'), setIdleClock(2.2), setxp(15),setNeedResource('Iron Ore'), stopGathering()}}>
						<Badge style={{margin:'.5rem'}} pill bg="success">Iron Bar</Badge></Col>
                     :
                     
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip1}
                    >
                     <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
                     	action ref={target} onClick={() => setShow(!show)}>
						<Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
					</Col>
                    </OverlayTrigger>
                     
                    }
                    
                    {character.smelting_xp >= 15000? <Col style={{margin: '1rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Gold Bar'), setIdleClock(3.2), setxp(35),setNeedResource('Gold Ore'), stopGathering()}}>
						<Badge style={{margin:'.5rem'}} pill bg="success">Gold Bar</Badge></Col>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip2}
                    >
                     <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
                     	action ref={target} onClick={() => setShow(!show)}>
						<Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
					</Col>
                    </OverlayTrigger>
                    }
                    
                    {character.smelting_xp >= 25000? <Col style={{margin: '1rem', textAlign: 'center' }} variant='success'
                     action onClick={()=>{setGatheredType('Dimond Bar'), setIdleClock(4.2), setxp(75),setNeedResource('Dimond Ore'), stopGathering()}}>
						<Badge style={{margin:'.5rem'}} pill bg="success">Dimond Bar</Badge></Col>
                     :
                     <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip3}
                    >
                    <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
                     	action ref={target} onClick={() => setShow(!show)}>
						<Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
					</Col>
                    </OverlayTrigger>
                    }

		</Row> 
		
		: 
		catagory === 'Wood Working' ?

		
		
		// -----
		<Row className="box2 g-4" style={{ justifyContent:'space-evenly'}} >
 
 {<Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='light' 
 action onClick={()=>{setGatheredType('Greenwood Log'), setIdleClock(1.5), setxp(10),setNeedResource('Greenwood'), stopGathering()} }>
	 <Badge style={{margin:'.5rem'}} pill bg="success">Greenwood Log</Badge></Col>}


 {character.wood_working_xp >= 5000? <Col style={{margin: '1rem', textAlign: 'center' }} variant='success'
  action onClick={()=>{setGatheredType('Cedar Log'), setIdleClock(2.2), setxp(15), stopGathering()}}>
	<Badge style={{margin:'.5rem'}} pill bg="success">Ceader Log</Badge></Col>
  :
  
 <OverlayTrigger
	 placement="top"
	 delay={{ show: 250, hide: 400 }}
	 overlay={renderTooltip1}
 >
  <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
	  action ref={target} onClick={() => setShow(!show)}>
	 <Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
 </Col>
 </OverlayTrigger>
  
 }
 
 {character.wood_working_xp >= 15000? <Col style={{margin: '1rem', textAlign: 'center' }} variant='success'
  action onClick={()=>{setGatheredType('Spruce Log'), setIdleClock(3.2), setxp(35),setNeedResource('Spruce'), stopGathering()}}>
	<Badge style={{margin:'.5rem'}} pill bg="success">Spruce Log</Badge></Col>
  :
  <OverlayTrigger
	 placement="top"
	 delay={{ show: 250, hide: 400 }}
	 overlay={renderTooltip2}
 >
  <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
	  action ref={target} onClick={() => setShow(!show)}>
	 <Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
 </Col>
 </OverlayTrigger>
 }
 
 {character.wood_working_xp >= 25000? <Col style={{margin: '1rem', textAlign: 'center' }} variant='success'
  action onClick={()=>{setGatheredType('RedWood Log'), setIdleClock(4.2), setxp(75),setNeedResource('Redwood'), stopGathering()}}>
	<Badge style={{margin:'.5rem'}} pill bg="success">Redwood Log</Badge></Col>
  :
  <OverlayTrigger
	 placement="top"
	 delay={{ show: 250, hide: 400 }}
	 overlay={renderTooltip3}
 >
 <Col className='box2' style={{margin: '1rem', textAlign: 'center' }} variant='danger'
	  action ref={target} onClick={() => setShow(!show)}>
	 <Badge style={{margin:'.5rem'}} pill bg="danger">LOCKED</Badge>
 </Col>
 </OverlayTrigger>
 }

</Row> 

: null

 }
        </div>
    )
}
export default Refining