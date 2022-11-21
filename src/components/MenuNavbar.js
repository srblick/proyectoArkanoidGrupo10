import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MenuNavbar(){
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Grupo 10</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Juego</Nav.Link>
                    <Nav.Link href="/desarrolladores">Desarrolladores</Nav.Link>
                    <Nav.Link href="/reglasdeljuego">Reglas del Juego</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}