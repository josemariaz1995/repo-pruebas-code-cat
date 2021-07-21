import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const CodeCat = () => {
  const [datosUsuario, setDatosUsuario] = useState([]);

  const { token, urlApi } = useContext(AuthContext);

  const obtenerDatosUsuario = useCallback(async () => {
    try {
      const response = await fetch(urlApi + "usuarios/datos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const usuario = await response.json();
      setDatosUsuario(usuario);
    } catch (error) {
      console.log(error);
    }
  }, [token, urlApi]);

  return (
    <Row>
      {/* {datosTrabajo.map((dato, index) => (
        <>
          <Col key={index} xs="12">
            Nombre Trabajo: {dato.nombre}
          </Col>
          {dato.tareas.map((tarea) => (
            <Col>Tarea: {tarea.nombre}</Col>
          ))}
        </>
      ))}
      {datosFormaciones.map((dato, index) => (
        <>
          <Col key={index} xs="12">
            Nombre Formacion: {dato.nombre}
          </Col>
          {dato.tareas.map((tarea) => (
            <Col>Tarea Formacion: {tarea.nombre}</Col>
          ))}
        </>
      ))} */}
    </Row>
  );
};
