import React from "react";
import Logo from "../assets/icons/Logo.svg";
import Lottie from "lottie-react";
import Emailvalid from "../assets/animations/Emailvalid.json"

const ValidateEmail = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 text-center">
      {/* Círculo para animación */}
      <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-6 shadow-lg">
        {/* Aquí luego importas tu animación (ej: Lottie o SVG) */}
        <img src={Logo} alt="Logo" className="w-18 h-24 " />
      </div>

      {/* Mensaje principal */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        !Verificando Correo!
      </h2>

      <p className="text-gray-600 max-w-sm mb-8">
        Este usuario todavía no se encuentra registrado, 
        se le enviará un correo para validar su identidad 
        y confirmar su cita.
      </p>

      {/* Imagen de sobre */}
        <div>
            <Lottie
            animationData={Emailvalid}
            style={{ height: 150 }}
            loop={true}
            />
        </div>

      {/* Botón */}
      <button
        onClick={onContinue}
        className="px-6 py-3 mt-15 rounded-full bg-gradient-to-r from-[#aee2e1] to-[#3d7f7e] text-white font-medium shadow-md hover:opacity-90 transition"
      >
        Finalizar
      </button>
    </div>
  );
};

export default ValidateEmail;