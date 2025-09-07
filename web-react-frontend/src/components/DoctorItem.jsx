import React from 'react';
import Doctor1 from "../assets/images/Doctor1.jpg";


const DoctorItem = ({ agenda_id, doctor_image, specialty, doctor_name, agenda_hora_start, agenda_hora_end, button }) => {
  return (
    <div
      key={agenda_id}
      className="flex flex-wrap items-center gap-4 p-4 bg-[#fbf9f9] rounded-2xl shadow-md border border-gray-200 transition"
    >
      {/* Avatar */}
      <img
        src={doctor_image || Doctor1}
        alt={doctor_name || ""}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Nombre */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-base font-semibold text-gray-900 truncate">
            {doctor_name || ""}
          </p>
        </div>

        {/* Especialidad */}
        <p className="text-sm text-gray-700 truncate">
          {specialty || "Especialidad"}
        </p>
      </div>

      {/* Horario */}
      <div className="text-sm text-gray-700 whitespace-nowrap w-full text-center sm:w-auto sm:text-left">
        {new Date(`1970-01-01T${agenda_hora_start}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
        {" - "}
        {new Date(`1970-01-01T${agenda_hora_end}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>

      {/* Botón Elegir */}
      <div className="w-full sm:w-auto">{button}</div>
    </div>
  );
};

export default DoctorItem;