import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = (props) => {
  const { children } = props;
  const [datosFormaciones, setDatosFormaciones] = useState([]);
  const token = localStorage.getItem("token");
  const [logueado, setLogueado] = useState(!!token);
  const history = useHistory();
  const urlApi = process.env.REACT_APP_URL_API;
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (!token) {
      history.push("/home");
    } else {
      history.push("/CodeCat");
    }
  }, [history, token]);
  const loguearUsuario = () => {
    setLogueado(true);
    history.push("/CodeCat");
  };

  const desloguearUsuario = useCallback(() => {
    localStorage.clear();
    setLogueado(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        logueado,
        token,
        desloguearUsuario,
        loguearUsuario,
        setCargando,
        urlApi,
        cargando,
        datosFormaciones,
        setDatosFormaciones,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
