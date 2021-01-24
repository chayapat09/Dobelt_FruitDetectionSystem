import React from 'react';
import ReactBootstrap, { Navbar, Nav, NavItem } from 'react-bootstrap';
import styles from './NavbarPage.module.scss';

const logo: string = styles.logo;
const navbarLink: string = styles.a;

function NavbarPage() {
  return (
    <div className={logo}>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Nav.Link href="/">RobotState</Nav.Link>
        <Nav.Link href="Summary">Summary</Nav.Link>
        <Nav.Link href="Logging">Logging</Nav.Link>
        <Nav.Link href="Gallery">Gallery</Nav.Link>
        <Nav.Link href="ModelManiputlation">Model Manipulation</Nav.Link>
        </Navbar>
    </div>
  );
}

export default NavbarPage;
