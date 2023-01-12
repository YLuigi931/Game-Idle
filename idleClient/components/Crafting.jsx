import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';


function Crafting(){

    const [bobby, setBobby] = useState(true)
	const [fill, setFill] = useState(0)

	useEffect(()=>{
		if(fill >= 100){
			setTimeout(() => setFill(0), 1000)
			
		}
		if(fill < 100){
		setTimeout(() => setFill(prev => prev += 2), 500)
		}
		}, [fill])

    return(
        <>
        <h1 style={{color:'white'}}>Buy full version to begin Crafting</h1>
		<h4 style={{color:'white'}}> Just kiding... will be uploaded on the next major upate</h4>
        {/* <ProgressBar className='progress' style={{margin:'2rem'}}>
	<ProgressBar className='progress-bar'/>
	</ProgressBar> */}
        </>
    )
}
export default Crafting