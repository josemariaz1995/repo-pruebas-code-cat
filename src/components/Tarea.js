import { useEffect } from "react";
import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { HeaderEjercicio } from "../ejercicios/HeaderEjercicio/HeaderEjercicio";
import { ListaSinOrdenar } from "../ejercicios/ListaSinOrdenar";

export const Tarea = () => {
  const { idTrabajo } = useParams();
  const { datosFormaciones } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const history = useHistory();
  const ejercicios = datosFormaciones.find(
    (formacion) => formacion._id === idTrabajo
  );
  const [datosEjercicio, setDatosEjercicio] = useState("");
  useEffect(() => {
    if (!ejercicios) {
      history.push("/CodeCat");
    }
  }, [ejercicios, history]);
  const paginaAnterior = () => {
    if (index === 0) {
      setIndex(ejercicios.tareas.length - 1);
      return;
    }
    setIndex(index - 1);
  };
  const paginaSiguiente = () => {
    if (index === ejercicios.tareas.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };
  useEffect(
    () => setDatosEjercicio(ejercicios.tareas[index]),
    [ejercicios.tareas, index]
  );
  return (
    <Row className="ejercicio">
      <Col onClick={paginaAnterior} xs="2">
        {"<"}
      </Col>
      <Col xs="8">{datosEjercicio.nombre}</Col>
      <Col onClick={paginaSiguiente} xs="2">
        {">"}
      </Col>
      {datosEjercicio.nombre === "Header" && (
        <HeaderEjercicio
          datosEjercicio={datosEjercicio}
          idTrabajo={idTrabajo}
        />
      )}
      {datosEjercicio.nombre === "Lista sin ordenar" && (
        <ListaSinOrdenar
          datosEjercicio={datosEjercicio}
          idTrabajo={idTrabajo}
        />
      )}
    </Row>
  );
};
