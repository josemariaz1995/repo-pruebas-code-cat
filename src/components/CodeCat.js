import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const CodeCat = () => {
  const [datosUsuario, setDatosUsuario] = useState([]);
  const { token, urlApi, setDatosFormaciones } = useContext(AuthContext);

  const obtenerDatosUsuario = useCallback(async () => {
    try {
      const response = await fetch(urlApi + "codecat/cargar-informacion", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const usuario = await response.json();
      setDatosUsuario(usuario);
      setDatosFormaciones([...usuario.listadoFormaciones]);
    } catch (error) {
      console.log(error);
    }
  }, [setDatosFormaciones, token, urlApi]);
  useEffect(() => obtenerDatosUsuario(), [obtenerDatosUsuario]);
  return (
    <Row>
      {datosUsuario.length !== 0 && (
        <>
          <Col>nivel: {datosUsuario.nivelUsuario.nivel}</Col>
          <ProgressBar
            className="progress p-0"
            striped
            animated
            variant="info"
            label={
              isNaN(
                Math.floor(
                  ((datosUsuario.usuario.experiencia -
                    datosUsuario.nivelUsuario.experiencia) *
                    100) /
                    (datosUsuario.siguienteNivel.experiencia -
                      datosUsuario.nivelUsuario.experiencia)
                )
              )
                ? ""
                : Math.floor(
                    ((datosUsuario.usuario.experiencia -
                      datosUsuario.nivelUsuario.experiencia) *
                      100) /
                      (datosUsuario.siguienteNivel.experiencia -
                        datosUsuario.nivelUsuario.experiencia)
                  ) + "%"
            }
            now={datosUsuario.usuario.experiencia}
            min={datosUsuario.nivelUsuario.experiencia}
            max={datosUsuario.siguienteNivel.experiencia}
          />
          <Col>Titulo: {datosUsuario.nivelUsuario.titulo}</Col>

          <Col>Username: {datosUsuario.usuario.username}</Col>
          <Col>Exp: {datosUsuario.usuario.experiencia}</Col>
          <Col>
            galletitas:
            {datosUsuario.usuario.galletas ? datosUsuario.usuario.galletas : 0}
          </Col>
        </>
      )}
    </Row>
  );
};
