import React from "react";

function Home(props) {
  const { sidebar } = props;
  return (
    <div className={sidebar ? "container-on" : "container-off"}>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          <h1>Bienvenido {localStorage.getItem("nombre")}</h1>
        </div>
        <div className="col-md-12 d-flex justify-content-center">
          <h1> {localStorage.getItem("rol")}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
