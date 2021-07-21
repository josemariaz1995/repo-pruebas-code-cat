import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Loading.css";

export const Loading = () => {
  const { cargando } = useContext(AuthContext);

  return (
    cargando && (
      <div className="contenedor-loading">
        <div className="loading">
          <div>Loading</div>
          <div className="puntos"></div>
        </div>
      </div>
    )
  );
};
