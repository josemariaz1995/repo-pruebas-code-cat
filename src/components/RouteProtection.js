import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const RouteProtecion = (props) => {
  const { children } = props;
  const { logueado } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (!logueado) {
      history.push("/home");
      return;
    }
  }, [logueado, history]);
  return children;
};
