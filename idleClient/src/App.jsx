import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
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
import Character from '../components/Character';
import NewCharacter from '../components/NewCharacter';
import Gathering from '../components/Gathering';
import Refining from '../components/Crafting';
import Crafting from '../components/Crafting';
import Combat from '../components/Combat';
import Inventory2 from '../components/inventory2';
import Inventory from '../components/Inventory';
import Market from '../components/Market';


function App() {

  const [user, setUser]= useState(null)
  const [userId,setUserId]= useState(0)
  // const [userInventory, setUserInventory]= useState([])

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
    // console.log(user)
    setUserId(user.id)
    setUser(user)
  }

  // const curr_user_inventory=async()=>{
    
  //   let inven_id =await axios.get(`current_user_inventory/${user}`)
  //   let data = inven_id.data
  //   console.log(data)

  // }

const signOut=async()=>{
  let myResponse=await axios.post('signOut/')
  if (myResponse.data["signout"]==true){
    window.location.href="/"
  }
}

  useEffect(()=>{
    curr_user()
    // curr_user_inventory()
}, [])

  return (
    <div className="App">
      <>
        <Navbar bg="light" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="/">IDLE TIME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <div className="d-flex position-absolute start-50">
                  <Nav.Link className="test" href="/#/Combat">
                    {" "}
                    Combat{" "}
                  </Nav.Link>
                  <NavDropdown
                    className="test1"
                    title="Profile"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href="/#/SignIn">
                      Sign-In
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/#/SignUp">
                      Sign-Up
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.3">
                      {user && user.username}
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      {/* SIGN OUT */}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="sign_out_btn"
                        onClick={signOut}
                      >
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

        <div className="sidenav">
          <a href="/#/Character">Character Stats</a>
          <a href="/#/Inventory">Inventory</a>
          <a href="/#/Gathering">Gathering</a>
          <a href="/#/Refining">Refining</a>
          <a href="/#/Crafting">Crafting</a>
          <a href="/#/Combat">Combat</a>
    	  <a href={`/#/Market/`}>Market</a>
          <a href="Skills">Skills</a>
          <a href="Whatever">Whatever</a>
        </div>

        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/SignIn" element={<SignInComp />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/Character" element={<Character />}></Route>
            <Route path="/newCharacter" element={<NewCharacter />}></Route>
            <Route path="/Refining" element={<Refining />}></Route>
            <Route path="/Crafting" element={<Crafting />}></Route>
            <Route path="/Gathering" element={<Gathering />}></Route>
            <Route path="/Combat" element={<Combat />}></Route>
            <Route path="/Inventory2f" element={<Inventory2 />}></Route>
      	    <Route path='/Inventory' element={<Inventory userStuff={userId}/>}></Route>
      	    <Route path='/Market/' element={<Market userStuff={userId} />}/>
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App
