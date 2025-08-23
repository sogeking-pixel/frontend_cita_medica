import React from "react";
import calendar from "../assets/icons/calendar.svg";
import timing from "../assets/icons/timing.svg";


export default function CitaDetails({ doctor, specialty, date, time }) {
  if (!doctor || !date || !time) {
    return (
      <div className="bg-white rounded-5xl shadow-lg p-6 text-gray-500 text-center">
        Selecciona un doctor, fecha y hora para ver el detalle de tu cita.
      </div>
    );
  }

/**
 * parseToLocalDate: convierte distintos formatos a un Date en hora local.
 * - Si recibe "YYYY-MM-DD" lo interpreta como fecha local (evita shift UTC).
 * - Si recibe Date o timestamp lo devuelve.
 * - Si recibe otra cadena, intenta new Date(cadena) como fallback.
 */
const parseToLocalDate = (d) => {
  if (!d) return null;
  if (d instanceof Date) return d;
  if (typeof d === "number") return new Date(d);
  if (typeof d === "string") {
    const ymd = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymd) {
      const y = parseInt(ymd[1], 10);
      const m = parseInt(ymd[2], 10) - 1; // months son 0-indexed
      const day = parseInt(ymd[3], 10);
      return new Date(y, m, day); // <-- fecha en hora local (00:00 local)
    }
    // fallback: puede ser ISO con hora u otro formato
    return new Date(d);
  }
  return null;
};

const dateObj = parseToLocalDate(date);

const formattedDate = dateObj
  ? dateObj.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  : date || "";

const capitalizedDate = formattedDate
  ? formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  : "";
// ── fin reemplazo ──

  return (
    <div className="bg-[#fdfdfd] rounded-lg shadow-lg p-4 sm:min-w-[350px] mx-auto">
      {/* Doctor */}
      <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4 mb-4">
        <img
          src={doctor?.foto || "/doctor.png"}
          alt={doctor?.usuario?.nombre_completo || "Doctor"}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-base font-light text-gray-500">
            {doctor?.usuario?.nombre_completo || "Nombre no disponible"}
          </h3>
          <p className="text-sm text-gray-400">
            {specialty || doctor?.especialidad || "Especialidad no disponible"}
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
