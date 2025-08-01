import Lottie from "lottie-react";
import Button from "./Button";
import { useEffect, useState } from "react";

const StatusEmail = ({ estado, onVolverInicio, animations }) => {
  const [currentEstado, setCurrentEstado] = useState(estado);
  const [show, setShow] = useState(true);

  const mensajes = {
    verificando: "Verificando tu correo electrónico...",
    exito: "¡Correo verificado con éxito! Ahora puedes iniciar sesión.",
    error: "Error al verificar el correo. El token no es válido o ha expirado.",
  };

  useEffect(() => {
    if (estado !== currentEstado) {
      setShow(false);
      setTimeout(() => {
        setCurrentEstado(estado);
        setShow(true); 
      }, 500); 
    }
  }, [estado, currentEstado]);

  return (
    <div
      key={currentEstado} 
      className={`flex flex-col items-center text-center transition-opacity duration-500 ease-in-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Lottie
        animationData={animations[currentEstado]}
        style={{ height: 150 }}
        loop={currentEstado === "verificando"}
      />
      <p className="text-gray-600 mb-6 max-w-sm">{mensajes[currentEstado]}</p>
      {currentEstado === "exito" && (
        <div className="transition-opacity duration-500 ease-in-out">
          <Button onClick={onVolverInicio}>Volver al Inicio</Button>
        </div>
      )}
    </div>
  );
};

export default StatusEmail;
