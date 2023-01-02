import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function SignInComp(){

	const signIn=async()=>{
		event.preventDefault()
		let username=document.getElementById("signInUserName").value
		let password=document.getElementById("signInPassword").value
		console.log(username, password)
		let myResponse=await axios.post('signIn/',{
		  'username':username,
		  'password':password
		})
	
		console.log(myResponse.data)
 	if (myResponse.data["signIn"]==true){
    window.location.href="/"
  	}
    else{
        alert("incorrect input")
    }
	}

	return (
	<>

	{/* SIGN IN */}
	<div className='box position-absolute top-50 start-50 translate-middle'>
        <Form onSubmit={signIn}>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control id='signInUserName' type="email" placeholder="name@example.com" />
      </FloatingLabel>

	<div className='input-group'>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control id='signInPassword' type="password" placeholder="Password" />
      </FloatingLabel>
	<Button onClick={signIn} className='input-group-append'>Sign in</Button>
	</div>
	</Form>	
	</div>
      {/* SIGN IN */}

	</>
	)
}
export default SignInComp
