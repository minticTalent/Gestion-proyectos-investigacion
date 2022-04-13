import React, { useState } from "react";
import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function HomeAdmin() {
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
          <Modal.Title>Rol administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                <CheckCircleIcon /> Podrás listar los proyectos registrados
              </p>
              <p>
                <CheckCircleIcon /> Tendrás acceso para listar los usuarios
                registrados en la plataforma.
              </p>
              <p>
                <CheckCircleIcon /> Podrás aceptar un usuario en la plataforma.
              </p>
              <p>
                <CheckCircleIcon /> Podrás aprobar la creación de un proyecto.
              </p>
              <p>
                <CheckCircleIcon /> podrás activar o inactivar un proyecto y
                tambien actualizar su estado.
              </p>
              <p>
                <CheckCircleIcon /> Podrás cambiar la fase de un proyecto.
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

export default HomeAdmin;
