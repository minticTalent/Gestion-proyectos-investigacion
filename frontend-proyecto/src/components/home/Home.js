import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import Welcome from "../../img/welcome(2).jpg";
import HomeStudiante from "./HomeStudiante.js";
import "./Home.css";
function Home(props) {
  const { sidebar } = props;
  return (
    <div className={sidebar ? "container-on" : "container-off"}>
      <Row>
        <Col md={12}>
          <Card border="light" className="bg-dark text-black shadow-lg">
            <Card.Img
              src={Welcome}
              alt="Card image"
              style={{ height: "400px" }}
            />
            <Card.ImgOverlay>
              <Card.Title className="text-center">
                <h3>Bienvenido...</h3>
                <h3>Sistema gestion de proyectos</h3>
              </Card.Title>
              <Card.Text className="text-center">
                Página web creada para la construcción y manteniento de
                proyectos, lo cual podras crear y controlar el funcionamiento y
                tiempo de los proyectos dependiendo tu rol.
              </Card.Text>
              <Card.Text className="text-center">
                <h2>¡Te deseo muchos éxitos!</h2>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
      {/* <Container className="pt-5"> */}
      <Row className="pt-5 pb-5">
        <Col sm={4} className="d-flex justify-content-center pb-4">
          <Card
            border="light"
            style={{ width: "18rem" }}
            className="bg-card shadow-lg"
          >
            <Card.Body>
              <Card.Title className="text-center">Estudiante</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Si tu rol es Estudiante
              </Card.Subtitle>
              <Card.Text>
                Podras enviar la solicitud a un proyecto para ser parte y poder
                colaborar en todos los retos de dicho proyecto
              </Card.Text>
              <HomeStudiante sidebar={sidebar} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="d-flex justify-content-center pb-4">
          <Card
            border="light"
            style={{ width: "18rem" }}
            className="bg-card shadow-lg"
          >
            <Card.Body>
              <Card.Title className="text-center">Lider</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Si tu rol es Lider
              </Card.Subtitle>
              <Card.Text>
                Podras crear y liderar el proyecto, también aceptar las
                solicitudes de los estudiantes que quieran hacer parte de tu
                proyecto
              </Card.Text>
              <Card.Link href="#">Saber más de lo que puedes hacer</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} className="d-flex justify-content-center pb-4">
          <Card
            border="light"
            style={{ width: "18rem" }}
            className="bg-card shadow-lg"
          >
            <Card.Body>
              <Card.Title className="text-center">Administrador</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Si tu rol es administrador
              </Card.Subtitle>
              <Card.Text>
                Podras aceptar los proyectos y darle el seguimiento adecuado
                hasta que se complete sastifatoriamente
              </Card.Text>
              <Card.Link href="#">Saber más de lo que puedes hacer</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* </Container> */}
    </div>
  );
}

export default Home;
