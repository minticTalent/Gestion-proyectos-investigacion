import React, { useState } from "react";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function HomeStudiante() {
  //Estado para el modal
  const [show, setShow] = useState(false);
  //Funciones para abrir y cerrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card.Link onClick={handleShow} style={{ cursor: "pointer" }}>
        Saber más de lo que puedes hacer
      </Card.Link>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rol estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                <CheckCircleIcon /> Tendrás acceso para listar y ver los
                detalles de los proyectos
              </p>
              <p>
                <CheckCircleIcon /> Podrás realizar la inscripción a los
                proyectos en los que deseas trabajar
              </p>
              <p>
                <CheckCircleIcon /> Podrás seleccionar el proyecto en el que
                estas trabajando y quieres agregar un nuevo avance.
              </p>
              <p>
                <CheckCircleIcon /> Podrás actualizar los avances del proyecto
                en el que estas inscrito.
              </p>
              <p>
                <CheckCircleIcon /> Podrás actualizar tu perfil.
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomeStudiante;
