import Button from 'react-bootstrap/Button'
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
    <div className='form_container'>
                <form onSubmit={signIn}>
                    <input id='signInUserName' placeholder='username' />
                    <input id='signInPassword' placeholder='password' type="password"/>
                    <br></br>
                    <Button style={{margin:'.35rem'}} size='sm' variant="outline-primary" onClick={signIn}>Sign In</Button>
                </form>
            </div>
      {/* SIGN IN */}
	</>
	)
}
export default SignInComp
