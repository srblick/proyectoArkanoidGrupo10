import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function ReglasDelJuego(){

    return(
        <Container>
            <Row className="justify-content-md-center mb-4">
                <h2 className="text-center" > Reglas del Juego</h2>
                <h1 className="text-center" > Arkanoid </h1>
                <p className="text-center">Otra versión de este famoso juego, más difícil todavía. Dos niveles de juego, desde principiante hasta avanzado.</p>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="col-sm-8">
                <h3 className="text-center">Instrucciones:</h3>
                    <p className="text-center">Con las teclas del cursor moverás la barra hacia los lados con el fin de recoger la pelota en su caída y hacerla subir de nuevo.</p>
                    <ul>
                        <li>El objetivo de este juego es romper todos los ladrillos que se encuentran en la parte superior, cuando limpies la pantalla pasarás de nivel y así sucesivamente.</li>
                        <li>Esperamos pases una velada agradable con esta versión.</li>
                    </ul>
	            </Col>                
            </Row>
        </Container>
    );
}