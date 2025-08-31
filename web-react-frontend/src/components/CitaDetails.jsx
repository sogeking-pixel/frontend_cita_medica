import React from "react";
import calendar from "../assets/icons/calendar.svg";
import timing from "../assets/icons/timing.svg";
import { formatLocalDateString } from "../utils/formtDateToString";

export default function CitaDetails({ doctor, specialty, date, time }) {
  if (!doctor || !date || !time) {
    return (
      <div className="bg-white rounded-5xl shadow-lg p-6 text-gray-500 text-center">
        Selecciona un doctor, fecha y hora para ver el detalle de tu cita.
      </div>
    );
  }



const capitalizedDate = formatLocalDateString(date);
  


  return (
    <div className="bg-[#fdfdfd] rounded-lg shadow-lg p-4 sm:min-w-[350px] mx-auto">
      {/* Doctor */}
      <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4 mb-4">
        <img
          src={doctor?.imagen || "/doctor.png"}
          alt={doctor?.usuario?.nombre_completo || "Doctor"}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-base font-light text-gray-500">
            {doctor?.usuario?.nombre_completo || "Nombre no disponible"}
          </h3>
          <p className="text-sm text-gray-400">
            {specialty || "Especialidad no disponible"}
          </p>
        </div>
      </div>

      {/* Fecha y hora */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-400">
          <img
            src={calendar}
            className="w-4 h-4 rounded-full bg-[#62abaa07] inline-block"
          />
          <span className="text-sm ">{capitalizedDate}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <img
            src={timing}
            className="w-4 h-4 rounded-full bg-[#62abaa07] inline-block"
          />
          <span className="text-sm">{time}</span>
        </div>
      </div>
    </div>
  );
}
