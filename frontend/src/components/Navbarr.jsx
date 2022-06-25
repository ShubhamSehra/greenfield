import React from 'react';

import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Logo from '../logos/school_logo.svg';

function Navbarr()  {

    return(
        <Navbar >
    <Container>
      <Link to="/" >

      <Navbar.Brand>
        <img
          alt="logo"
          src={Logo}
          width="50px"
          height="50px"
          className="d-inline-block align-top"
        />{' '}
     <strong className='brand-name'> <span style={{color : "green"}} >GREEN FILED</span></strong> 
      </Navbar.Brand>
      </Link>
    </Container>
    <Nav className='m-2' >

    
    <Link to="/students" className='me-2' style={{ color: "transparent" }}  > 
    <strong > <span style={{color : "green"}} >Dashboard</span></strong> 
     </Link>
    <Link to="/enroll" style={{ color: "transparent" }}  >
    <strong > <span style={{color : "green"}} >Enroll</span></strong> 
    
    </Link>
    </Nav>
  </Navbar>
    )

}

export default Navbarr;