import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar.js"; // Importamos navbar
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // importaciones de react router dom
import ListarUsuarios from "./components/usuarios/ListarUsuarios.js"; // Archivo de prueba para mostrar funcionamiento
import ListarProyectos from "./components/proyectos/ListarProyectos.js"; // Archivo de prueba para mostrar funcionamiento
import Login from "./components/login/Login"; // archivo de donde se creara el login
function App() {
  const [sidebar, setSidebar] = useState(false); // estado llamada de igual forma para el evento de mostrar y ocultar
  const [login, setLogin] = useState(true); // estado para mostrar funcionamiento dado si el usuario esta logueado es true si no es false
  // funcion que se le manda al archivo Navbar.js para recibir el estado mediante las props
  const showSidebarApp = (item) => {
    setSidebar(item); // se le manda al estado sidebar el dato siendo true o false del evento
  };
  // condicion para renderizar la pagina del login en caso de que no este logueado el usuario
  if (!login) {
    return (
      <>
        <Router>
          <Route exact path="/">
            <Login />
          </Route>
        </Router>
      </>
    );
  } else {
    // si no se rendiza el navbar y las paiginas a navegar si esta logueado el usuario
    return (
      <>
        <Router>
          <Navbar showSidebarApp={showSidebarApp} />
          <Switch>
            <Route path="/listar-usuarios">
              {/*Se envia el estado siendo true o false por las props al archivo ListarUsuarios */}
              {/*Para cada pagina que se cree se le tiene que enviar el estado por la props para su uso en dicha pagina */}
              <ListarUsuarios sidebar={sidebar} />
            </Route>
            <Route path="/listar-proyectos">
              {/*Se envia el estado siendo true o false por las props al archivo ListarProyectos */}
              <ListarProyectos sidebar={sidebar} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
