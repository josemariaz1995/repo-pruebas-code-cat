import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Registrar = (props) => {
  const { urlApi, setCargando } = useContext(AuthContext);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [verificar, setVerificar] = useState(false);
  const [error, setError] = useState("");

  const [datos, setDatos] = useState({});
  const agregarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const comprobarContrasenya = (e) => {
    setRepeatPassword(e.target.value);
  };
  const registrarse = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (
      repeatPassword === datos.password &&
      repeatPassword !== "" &&
      datos.password !== ""
    ) {
      try {
        const response = await fetch(urlApi + "usuarios/registro", {
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
        setError("");
        setCargando(false);
        setVerificar(true);
      } catch (e) {
        setCargando(false);
        setError("Ha habido un error, " + e.mensaje);
      }
    } else if (!repeatPassword || !datos.password) {
      setError("");
      setCargando(false);
    } else {
      setError("Las contraseñas no coinciden");
      setCargando(false);
    }
  };
  return (
    <>
      {!verificar && (
        <>
          <Form onSubmit={registrarse}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="nombre">Nombre:</Form.Label>
              <Form.Control name="nombre" type="text" onChange={agregarDatos} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="username">Usuario: </Form.Label>
              <Form.Control
                name="username"
                type="text"
                onChange={agregarDatos}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control name="email" type="email" onChange={agregarDatos} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="password">Contraseña </Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={agregarDatos}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="repeatPassword">
                Repetir contraseña:
              </Form.Label>
              <Form.Control
                name="repeatPassword"
                type="password"
                onChange={comprobarContrasenya}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
          <span>{error !== "" && error}</span>
        </>
      )}
      {verificar &&
        "Verifica tu cuenta accediendo al correo que te ha llegado al email"}
    </>
  );
};
