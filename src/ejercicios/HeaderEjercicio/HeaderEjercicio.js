import Button from "react-bootstrap/Button";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./HeaderEjercicio.css";
import { Col } from "react-bootstrap";
export const HeaderEjercicio = (props) => {
  const { datosEjercicio, idTrabajo } = props;
  const { urlApi, token } = useContext(AuthContext);
  const [input1, setInput1] = useState("");
  const [acierto, setAcierto] = useState(false);
  const [texto, setTexto] = useState("");

  const comprobarEjercicio = useCallback(async () => {
    if (input1 === datosEjercicio.objetivos[0]) {
      setAcierto(true);
      const response = await fetch(
        `${urlApi}historial/anyadir-tarea/${idTrabajo}/${datosEjercicio._id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token },
        }
      );
      await response.json();
      setTexto("");
    } else {
      setTexto("Este header no es tan chulo!!");
      setAcierto(false);
    }
  }, [
    datosEjercicio._id,
    datosEjercicio.objetivos,
    idTrabajo,
    input1,
    token,
    urlApi,
  ]);

  return (
    <>
      <Col as="h2" xs="12" className="text-center mt-3">
        {datosEjercicio.descripcion}
      </Col>
      <Col xs="12" className="input-ejercicio primer-input">
        <span>{"< "}</span>
        <input type="text" onChange={(e) => setInput1(e.target.value)} />
        <span>{" >"}</span>
      </Col>
      <Col xs="12">
        <span>{"<h1>"}</span>
        <span>Esta es una cabecera</span>
        <span>{" </h1>"}</span>
      </Col>
      <Col xs="12" className="input-ejercicio ultimo-input">
        <span>{"</ "} </span>
        <input type="text" value={input1} readOnly />
        <span>{" >"}</span>
      </Col>

      <Button onClick={comprobarEjercicio}>Comprobar</Button>
      {acierto && "Bien!"}
      {texto !== "" && texto}
    </>
  );
};
