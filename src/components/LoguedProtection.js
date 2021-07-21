import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const LoguedProtecion = (props) => {
  const { children } = props;
  const { logueado } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (logueado) {
      history.push("/CodeCat");
      return;
    }
  }, [logueado, history]);
  return children;
};
