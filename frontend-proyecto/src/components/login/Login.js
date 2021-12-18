import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../useRequest";
import RegistrarUsuario from "../registrarUsuario/RegistrarUsuario";
import { useAlert } from "react-alert";
function Login(props) {
  const [login, setLogin] = useState({
    user: "",
    password: "",
  });
  const alert = useAlert();
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    await client
      .query({
        query: gql`
          query {
            getUsuarios {
              _id
              identificacion
              nombre
              password
              rol
              estado
              email
            }
          }
        `,
      })
      .then((result) => validarLogin(result.data.getUsuarios));
  }
  async function validarLogin(result) {
    result.map((item) => {
      if (
        item.email == login.user &&
        item.password == login.password &&
        item.estado == "autorizado"
      ) {
        localStorage.setItem(`ID`, `${item._id}`);
        localStorage.setItem("rol", `${item.rol}`);
        localStorage.setItem("nombre", `${item.nombre}`);
        localStorage.setItem("documento", `${item.identificacion}`);
        window.location.href = "/Home";
      }
    });
    !localStorage.getItem("ID") &&
      alert.error("usuario invalido o sin autorización");
  }
  return (
    <div>
      <section
        style={{
          backgroundColor: `lavender`,
          width: "100%",
          boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://i.pinimg.com/originals/24/52/a8/2452a8ce23bcc5fb412df2f1241713ea.gif"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img
                            src="http://www.epayment.com.ng/images/blog-wp-login-1200x400.png"
                            alt=""
                            className="img-fluid"
                            style={{
                              width: "50%",
                              position: "flex",
                              margin: "auto",
                            }}
                          ></img>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Ingresa con tu cuenta
                        </h5>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            email *
                          </label>
                          <input
                            type="text"
                            name="user"
                            onChange={handleChange}
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Digite su email"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Contraseña *
                          </label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="Digite su contraseña"
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          No tienes cuenta ?{" "}
                          <a href="#!" style={{ color: "#393f81" }}>
                            <RegistrarUsuario />
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
