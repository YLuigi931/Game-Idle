import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import SignInComp from '../components/signin.jsx'
import Home from '../components/home.jsx'

function App() {
  const [count, setCount] = useState(0)


  return (
	  <>

    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand href="/">IDLE TIME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
	  <div className='d-flex position-absolute start-50'>
            <Nav.Link className='test' href="/#/SignIn">Link</Nav.Link>
            <NavDropdown className='test1' title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
	    </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

	<Router>
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/SignIn' element={<SignInComp />}></Route>
			<Route></Route>
		</Routes>
	</Router>
	  </>
  )
}

export default App
