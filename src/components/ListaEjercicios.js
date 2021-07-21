import { useContext } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const ListaEjercicios = (props) => {
  const { datosFormaciones, setDatosFormaciones, token, urlApi } =
    useContext(AuthContext);
  const history = useHistory();

  const obtenerFormacion = useCallback(async () => {
    try {
      const response = await fetch(urlApi + "trabajos/listado-formaciones", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const formaciones = await response.json();
      if (formaciones.error) {
        throw new Error(formaciones);
      }
      setDatosFormaciones(formaciones);
    } catch (error) {
      if (error.mensaje.includes("caducado")) {
        history.push("/home");
        localStorage.clear();
      }
      console.log(error);
    }
  }, [history, setDatosFormaciones, token, urlApi]);

  const anyadirTrabajoHistorial = useCallback(
    async (idTrabajo) => {
      const response = await fetch(
        urlApi + "historial/anyadir-trabajo/" + idTrabajo,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await response.json();
    },
    [token, urlApi]
  );
  useEffect(() => obtenerFormacion(), [obtenerFormacion]);

  const irEjercicios = async (id) => {
    history.push("/ejercicios/" + id);
    await anyadirTrabajoHistorial(id);
  };

  return (
    <Row>
      {datosFormaciones?.map((formacion) => (
        <Col
          key={formacion._id}
          className="cabecera-formacion"
          onClick={() => irEjercicios(formacion._id)}
        >
          {formacion.nombre}
        </Col>
      ))}
    </Row>
  );
};
