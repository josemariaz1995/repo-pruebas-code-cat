import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsPower } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const Header = () => {
  const { desloguearUsuario, logueado } = useContext(AuthContext);
  return (
    <>
      <header className="cabecera">
        <Container>
          <Row className="navegador">
            <Col>
              <Nav as="ul" className="navegador-links">
                {!logueado && (
                  <>
                    <Nav.Item as="li">
                      <NavLink to="/home">Inicio</NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <NavLink to="/register">Register</NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <NavLink to="/login">Login</NavLink>
                    </Nav.Item>
                  </>
                )}
                {logueado && (
                  <Nav.Item as="li">
                    <NavLink to="/CodeCat">CodeCat</NavLink>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            <Col>{logueado && <BsPower onClick={desloguearUsuario} />}</Col>
          </Row>
        </Container>
      </header>
    </>
  );
};
