import { useContext } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const ListaEjercicios = (props) => {
  const { datosFormaciones, token, urlApi } = useContext(AuthContext);
  const history = useHistory();

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
