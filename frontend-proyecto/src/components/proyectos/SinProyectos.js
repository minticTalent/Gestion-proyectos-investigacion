import React from "react";
import vectorCapeta from "../../img/vector-carpeta.png";
import { Row, Col, Alert } from "react-bootstrap";
import "./Misproyectos.css";
function SinProyectos() {
  return (
    <>
      <Row>
        <Col md={12} className="d-flex justify-content-center pb-5">
          {/* <h1>Aún no tienes proyectos</h1> */}
          <Alert variant="info">
            <Alert.Heading>Hey, aún no tienes proyectos</Alert.Heading>
            <p>Cuando hagas parte de un proyecto apareceran en esta ventana.</p>
            {/* <hr />
            <p className="mb-0">
              Whenever you need to, be sure to use margin utilities to keep
              things nice and tidy.
            </p> */}
          </Alert>
        </Col>
        <Col md={12} className="d-flex justify-content-center rebote">
          <img
            src={vectorCapeta}
            // className="d-flex justify-content-center"
            alt="..."
            style={{ maxWidth: "15rem" }}
          />
        </Col>
      </Row>
    </>
  );
}

export default SinProyectos;
