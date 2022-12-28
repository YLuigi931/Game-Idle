import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";
import Button from 'react-bootstrap/Button';

function App() {
  const [count, setCount] = useState(0)

  //--------------Cookie set-up---------------------------//
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken
  //--------------Cookie set-up---------------------------//

  const curr_user=async()=>{
    let myResponse=await axios.get('current_user/')
    let user= myResponse.data
    console.log(user)
    setUser(user)
  }

  const signUp=async()=>{
    event.preventDefault()
    let email=document.getElementById("signUpEmail").value
    let username=document.getElementById("signUpUserName").value
    let first_name=document.getElementById("signUpFirstName").value
    let last_name=document.getElementById("signUpLastName").value
    let password=document.getElementById("signUpPassword").value
    let password2=document.getElementById("signUpPassword2").value
    console.log(email, password, password2)

    if (password === password2){
    let myResponse=await axios.post('signUp/',{
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'email':email,
        'password':password
    })
}else{
    alert("Make sure your passwords match!")
}
if(myResponse.data['signup']==true){
    window.location.href="/"
}
}

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

const signOut=async()=>{
  let myResponse=await axios.post('signOut/')
  if (myResponse.data["signout"]==true){
    window.location.reload()
  }
}

  useEffect(()=>{
    curr_user()
}, [])

  return (
    <div className="App">


    {/* SIGN UP */}
      <div className='form_page'>
        <div className='form_container'>
        <form onSubmit={signUp}>
        <div>
        <input className='signInput' id='signUpFirstName' placeholder='First Name' />
        <input className='signInput' id='signUpLastName' placeholder='Last Name' />
        </div><br></br>
        <div>
        <input className='signInput' id='signUpEmail' placeholder='email' />
        <input className='signInput' id='signUpUserName' placeholder='username' />
        </div><br></br>
        <input className='signInput' id='signUpPassword' placeholder='password' />
        <input className='signInput' id='signUpPassword2' placeholder='re-enter password' />
        <br></br>
        <Button style={{margin:'.35rem'}} size='sm' variant="outline-primary" onClick={signUp}>Sign Up</Button>
        </form>
        </div>
    </div>
    {/* SIGN UP */}
    {/* SIGN IN */}
    <div className='form_container'>
                <form onSubmit={signIn}>
                    <input id='signInUserName' placeholder='username' />
                    <input id='signInPassword' placeholder='password' type="password"/>
                    <Button style={{margin:'.35rem'}} size='sm' variant="outline-primary" onClick={signIn}>Sign In</Button>
                </form>
            </div>
      {/* SIGN IN */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
