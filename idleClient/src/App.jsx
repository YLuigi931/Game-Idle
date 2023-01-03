import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import SignInComp from '../components/signin.jsx'
import SignUp from '../components/SignUp';
import Home from '../components/home.jsx'


function App() {

  const [user, setUser]= useState(null)

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
	  <>
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand href="/">IDLE TIME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
	  <div className='d-flex position-absolute start-50'>
	 <Nav.Link className='test'> Combat </Nav.Link> 
            <NavDropdown className='test1' title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/#/SignIn">Sign-In</NavDropdown.Item>
              <NavDropdown.Item href="/#/SignUp">
                Sign-Up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">{user && user.username}</NavDropdown.Item>

              <NavDropdown.Item >
      {/* SIGN OUT */}
      <Button  size='sm' variant="outline-danger" className='sign_out_btn' onClick={signOut}>
        Sign Out
      </Button>
      {/* SIGN OUT */}
              </NavDropdown.Item>
            </NavDropdown>
	    </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

	  <div className='sidenav'>
	  <a href="Inventory">Inventory</a>
	  <a href="Gathering">Gathering</a>
	  <a href="Skills">Skills</a>
	  <a href="Whatever">Whatever</a>
	  </div>

	<Router>
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/SignIn' element={<SignInComp />}></Route>
			<Route path='/SignUp' element={<SignUp/>} ></Route>
		</Routes>
	</Router>
	  </>
    </div>
  )
}

export default App