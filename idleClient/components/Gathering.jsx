import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'




function Gathering(){

    const [bobby, setBobby] = useState(true)
	const [fill, setFill] = useState(0)
    const [active, setActive] = useState(false)
    const count = 0
    let idleClock = 4
    
    
    function idleGathering(){
        setFill(prev => prev += 2)
        console.log(fill)
    }

    function startGathering(){
        setActive(true)
    }
    function stopGathering(){
        setActive(false)
    }

	useEffect(()=>{
        if (active) {
            if (fill < 100 ) {
              setTimeout(()=>idleGathering(), (idleClock*1000));
            }
          }
        }, [fill, active]);

    return(
        <>
        <h1 style={{color:'white'}}>Start Gathering</h1>
    <Row xs={2} xxl={4} lg={3} className="g-4">
      
        <Col>
            <Card className='card'>
            <Card.Body>
            <Card.Title>Fishing</Card.Title>
            <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
            </Card.Text>
            <footer className="text-muted">
                <Row>
                <Button variant="success" onClick={startGathering}>Start Fishing</Button>
                <Button variant="dark" onClick={stopGathering}>Stop Fishing</Button>
                </Row>
                <ProgressBar className='progress' style={{margin:'1rem'}}>
                    {active ?<ProgressBar style={{animationDuration:`${idleClock}s`}} className='progress-bar' />: <></>}
                </ProgressBar>
            </footer>
            </Card.Body>
            </Card>
        </Col>
       
    </Row>
    </>
    )
}
export default Gathering