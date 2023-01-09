import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


function Inventory2(){
	const [bag, setBag] = useState([])

	const checkInventory=async()=>{
		const getInventory=await axios.get('getInventory/')
		console.log(getInventory)
		setBag(getInventory.data.item_inventory)
	}
	const addItem=async()=>{
		console.log('hi')
		const addBag= await axios.post('addGatheringItem/', {'item':'dummy'})
		console.log(addBag)
		checkInventory()
	}


	useEffect(()=>{
		checkInventory()
	},[])


	return(
		<>

	<Row xs={1} md={2} className="box g-4" style={{margin:0}}>
	<Col>
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
	<Button onClick={addItem}>CLICK TO ADD</Button>
	</Row>
	<Row className='box g-4'>
	{bag.map((item, index)=> { return (
		<>
		<div className='box2'>{item}</div>
		</>
	)})}
	</Row>
	</>



	)
}
export default Inventory2
