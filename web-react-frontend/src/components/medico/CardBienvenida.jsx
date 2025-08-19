import React from 'react';

const CardBienvenida = ({ nombres, children }) => {
  return (
    <div className="mt-5 w-full bg-[#75ebdb] shadow-lg rounded-xl p-6 mb-10 lg:mb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            ¡Bienvenido de nuevo, Dr. {nombres}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Gestiona tus pacientes y tareas del día de forma eficiente.
          </p>
        </div>

        <div className="text-right">{children}</div>
      </div>
    </div>
  );
};

export default CardBienvenida;
