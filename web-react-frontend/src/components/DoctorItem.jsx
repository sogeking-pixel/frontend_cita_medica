import React from 'react';
import Doctor1 from "../assets/images/Doctor1.jpg";
const DoctorItem = ({ agenda_id, doctor_image, specialty, doctor_name,agenda_hora_start, agenda_hora_end, button  }) => {
    return (
      <div
        key={agenda_id}
        className="flex items-center gap-4 p-4 bg-[#fbf9f9] rounded-2xl shadow-md border border-gray-200 transition"
      >
        {/* Avatar */}
        <img
          src={doctor_image || Doctor1}
          alt={doctor_name || ""}
          className="w-20 h-20 rounded-full object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          {/* Nombre + experiencia */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-semibold text-gray-900">
              {doctor_name || ""}
            </p>
          </div>

          {/* Rango de Horario */}
          <p className="text-sm  text-gray-700">
            {specialty || "Especialidad"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-700">
            {new Date(`1970-01-01T${agenda_hora_start}`).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }
            )}
            -
            {new Date(`1970-01-01T${agenda_hora_end}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        {/* Botón Elegir */}
        {button}
      </div>
    );
};

export default DoctorItem;