import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CodeCat } from "./components/CodeCat";
import { Header } from "./components/Header";
import { ListaEjercicios } from "./components/ListaEjercicios";
import { Loading } from "./components/Loading/Loading";
import { LoguedProtecion } from "./components/LoguedProtection";
import { RouteProtecion } from "./components/RouteProtection";
import { Tarea } from "./components/Tarea";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { HeaderEjercicio } from "./ejercicios/HeaderEjercicio/HeaderEjercicio";
import { Loguear } from "./pages/Loguear";
import { Registrar } from "./pages/Registrar";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Loading />
        <Header />
        <Container as="main">
          <Switch>
            <Route path="/home" exact>
              <LoguedProtecion>Inicio</LoguedProtecion>
            </Route>
            <Route path="/register" exact>
              <LoguedProtecion>
                <Registrar />
              </LoguedProtecion>
            </Route>
            <Route path="/login" exact>
              <LoguedProtecion>
                <Loguear />
              </LoguedProtecion>
            </Route>
            <Route path="/CodeCat" exact>
              <RouteProtecion>
                <CodeCat />
                <ListaEjercicios />
              </RouteProtecion>
            </Route>
            <Route path="/ejercicios/:idTrabajo" exact>
              <RouteProtecion>
                <Tarea />
              </RouteProtecion>
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Container>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
