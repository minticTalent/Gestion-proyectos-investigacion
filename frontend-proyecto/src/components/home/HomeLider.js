import React, { useState } from "react";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function HomeLider() {
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
          <Modal.Title>Rol lider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                <CheckCircleIcon /> Tendrás acceso para listar y ver los
                detalles de los proyectos
              </p>
              <p>
                <CheckCircleIcon /> Podrás registrar tu proyecto.
              </p>
              <p>
                <CheckCircleIcon /> Podrás listar las inscripciones de los
                estudiantes en tu proyecto para aceptarlos o rechazarlos.
              </p>
              <p>
                <CheckCircleIcon /> podrás añadir observaciones a los avances
                realizados por los estudiantes
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

export default HomeLider;
