import React from 'react';
import DoctorImg from "../../assets/images/WelcomeDoctor1.jpg"; // ajusta la ruta

const CardBienvenida = ({ nombres, children }) => {
  return (
    <div
      className="mt-5 w-full  shadow-xl rounded-xl rounded-bl-xs rounded-br-xs p-6 mb-10 lg:mb-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${DoctorImg})` }}
    >
      <div className="flex items-center lg:justify-end">
        <div className=" p-6 rounded-xl w-full md:w-1/2 text-center lg:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-[#448383]">
            ¡Bienvenido de nuevo, Dr. {nombres}! 👋
          </h1>
          <p className="text-gray-50 mt-3">
            Gestiona tus pacientes y tareas del día de forma eficiente.
          </p>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CardBienvenida;
