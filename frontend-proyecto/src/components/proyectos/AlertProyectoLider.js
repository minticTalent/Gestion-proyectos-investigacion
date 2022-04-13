import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";

export const AlertProyectoLider = () => {
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
            Tú proyecto iniciara cuando el administrador lo de por aceptado.
          </p>
          <hr />
        </Alert>
      )}
    </>
  );
};
