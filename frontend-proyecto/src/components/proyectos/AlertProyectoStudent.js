import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";

export const AlertProyectoStudent = () => {
  //estado para cerrar la alerta
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert && (
        <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>
            {" "}
            <InfoIcon color="info" fontSize="large" /> Importante
          </Alert.Heading>
          <p>
            Cómo estudiante sólo podrás inscribirte a un proyecto si el estado
            del proyecto está activo y la fase del proyecto no este terminada.
          </p>
          <hr />
        </Alert>
      )}
    </>
  );
};
