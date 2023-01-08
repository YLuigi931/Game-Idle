
import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'

function Home(){
	const [bobby, setBobby] = useState(true)
	const [fill, setFill] = useState(0)


	const testAddItem = async ()=> {

		let character_name = "nick"
        let item = "test sword"

        let myresponse = await axios.post('addItem/', {'character_name': character_name, 'item': item})
        console.log(myresponse.data)
	}

	useEffect(()=>{
		if(fill >= 100){
			setTimeout(() => setFill(0), 1000)
			
		}
		if(fill < 100){
		setTimeout(() => setFill(prev => prev += 2), 500)
		}
		}, [fill])

	function CreateThis(){

		return (
			<>
			<div className='special'>
			<p>Lorem laborum dolorem reiciendis ipsam ratione! Beatae quidem nobis obcaecati soluta porro aut Corrupti ut explicabo ipsa provident facere perspiciatis Optio aut reiciendis autem eaque reiciendis? Nihil suscipit repudiandae tenetur</p>
			</div>
			</>
		)}



	return (
		<>
		{/* <p>Jacob, was here</p>
		<p>On the home page</p>
		<p>bottom line</p>
        <button onClick={testAddItem} >Click to add item!</button>
        <button onClick={testDeleteItem} >Click to deleeet ittttttteeemmmmmmmmmmmmmmm item!</button> */}
    <Row xs={2} xxl={4} lg={3} className="g-4">
      	{Array.from({ length: 8 }).map((_, idx) => (
	<>
    <Col>
         <Card className='card'>
         <Card.Body>
         <Card.Title>Card title</Card.Title>
         <Card.Text>
         This is a longer card with supporting text below as a natural
         lead-in to additional content. This content is a little bit
         longer.
         </Card.Text>
         </Card.Body>
         </Card>
    </Col>
	</>
	))}
	

    </Row>

	<ProgressBar className='progress' style={{margin:'2rem'}}>
	<ProgressBar className='progress-bar'/>
	</ProgressBar>

	
    	<Row xs={1} md={2} className="box g-4" style={{margin:0}}>
	<Col>
	<p onClick={()=>{setBobby(!bobby)}} className='box2 text-center'>just a text test</p>
		{bobby ?null:<CreateThis/>}
	<p className='box2 text-center'>just a text test</p>
	<p className='box2 text-center'>just a text test</p>
	<p className='box2 text-center'>just a text test</p>
	<p className='box2 text-center'>just a text test</p>
	
	</Col>
	<Col className='box2'>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	</Col>
	</Row>
	<button onClick={testAddItem} > HERHERHEHRHE IS THE BUTTON </button>
    	<Row xs={1} md={2} className="box g-4" style={{margin:0}}>
	<Col className='box2'>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	
	</Col>
	<Col className='box2'>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	</Col>
	</Row>
		</>
	)
}
export default Home