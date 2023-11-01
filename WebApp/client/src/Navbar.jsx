import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './styles/Navbarr.css';

function NavBar(props) {
  const navbarStyle = {
    width: props.width || '57%' // Use the provided width or a default value
  };

  return (
    <nav className="navbar navbar-light bg-secondary">
      <span className="navbar-text" style={{ color: 'white', textAlign: 'right', width: navbarStyle.width }}>
        {props.text}
      </span>
    </nav>
  );
}

export default NavBar;


