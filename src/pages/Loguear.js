import { useState } from "react";
import Button from "react-bootstrap/Button";

import { Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Loguear = (props) => {
  const { urlApi, setCargando, loguearUsuario } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({});
  const agregarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const loguearse = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (datos.password !== "" && datos.username !== "") {
      try {
        const response = await fetch(urlApi + "usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
        const respuesta = await response.json();
        if (respuesta.error) {
          throw respuesta;
        }
        localStorage.setItem("token", respuesta.token);
        loguearUsuario();
        setCargando(false);
        setError("");
        const responseHistorial = await fetch(
          urlApi + "historial/comprobar-historial",
          {
            headers: {
              Authorization: "Bearer " + respuesta.token,
            },
          }
        );
        const existeHistorial = await responseHistorial.json();
        if (!existeHistorial) {
          const responseCrearHistorial = await fetch(
            urlApi + "historial/crear-historial",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + respuesta.token,
              },
            }
          );
          const crearHistorial = await responseCrearHistorial.json();
          console.log(crearHistorial);
        }
      } catch (e) {
        setCargando(false);
        setError(e.mensaje);
      }
    } else {
      setCargando(false);
      setError("Faltan credenciales para iniciar sesion");
    }
  };
  return (
    <>
      <Form onSubmit={loguearse}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="username">Usuario: </Form.Label>
          <Form.Control name="username" type="text" onChange={agregarDatos} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="password">Contraseña </Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={agregarDatos}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
      {error !== "" && error}
    </>
  );
};
