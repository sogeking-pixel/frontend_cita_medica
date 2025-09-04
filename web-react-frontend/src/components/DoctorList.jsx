import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../routes/routesConfig";
import DoctorItem from "./DoctorItem";
import Lottie from "lottie-react";
import Load from "../assets/animations/Load.json";

const DoctorList = ({ agendas, specialty, loading = false}) => {

  const navigate = useNavigate();

  //  Función parseDate
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    if (dateStr.includes("-")) return new Date(`${dateStr}T00:00:00`);
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

  const handleChooseAgenda = (agenda) => {
    if (!agenda) return;
    navigate(
      `${getRoute("elegir-tiempo-doctor").path}?agenda=${encodeURI(agenda.id)}`
    );
  };

  //  Generar horarios
  const generateTimeSlots = (start, end, timespace, slots_ocupados = []) => {
    const slots = [];
    if (!start || !end || !timespace) return slots;

    const normalize = (t) => {
      if (!t) return t;
      const parts = t.split(":");
      return parts
        .slice(0, 2)
        .map((p) => p.padStart(2, "0"))
        .join(":");
    };

    // Normalizamos los ocupados y creamos un Set para búsquedas rápidas
    const occupiedSet = new Set(
      (slots_ocupados || []).map((s) => normalize(s))
    );

    const [startHour, startMinute] = start.split(":").slice(0, 2).map(Number);
    const [endHour, endMinute] = end.split(":").slice(0, 2).map(Number);

    let currentTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const step = Number(timespace);

    while (currentTime < endTime) {
      const hours = Math.floor(currentTime / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (currentTime % 60).toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      slots.push({
        time,
        occupied: occupiedSet.has(time),
      });
      currentTime += step;
    }

    return slots;
  };


  return (
    <div className="pb-50 px-10 bg-gradient-to-t from-[#e4f5f8c8]">
      <div className="bg-white rounded-2xl shadow-2xl p-5 md:py-10 md:px-12 max-w-5xl xl:w-[1000px]  mx-auto fade-in-up">
        {/* Cabecera */}
        <div className="flex items-center border-b-[2px] border-gray-200 pb-3 mb-4">
          <div
            className={`flex items-center justify-center w-10 h-9 rounded-full text-white text-lg font-medium mr-3 
          ${agendas.length > 0 ? "bg-[#62abaa]" : "bg-gray-300"}`}
          >
            2
          </div>
          <h3
            className={`text-2xl font-semibold 
          ${agendas.length > 0 ? "text-[#62abaa]" : "text-gray-400"}`}
          >
            Elegir Doctor
          </h3>
        </div>

        {/* Contenido dinámico */}
        {loading ? (
          // 👇 Loader centrado
          <div className="flex justify-center items-center py-10">
            <Lottie animationData={Load} style={{ height: 120 }} loop />
          </div>
        ) : agendas.length > 0 ? (
          // 👇 Lista de doctores
          <div className="space-y-3">
            {agendas.map((agenda) => (
              <DoctorItem
                key={agenda.id}
                agenda_id={agenda.id}
                doctor_image={agenda.medico.imagen}
                doctor_name={agenda.medico.usuario.nombre_completo}
                agenda_hora_start={agenda.hora_inicio}
                agenda_hora_end={agenda.hora_fin}
                specialty={specialty}
                button={
                  <button
                    onClick={() => handleChooseAgenda(agenda)}
                    className="bg-[#62abaa] hover:bg-[#4f9b95] text-white px-4 py-2 rounded-xl"
                  >
                    Elegir
                  </button>
                }
              />
            ))}
          </div>
        ) : (
          // 👇 Mensaje vacío
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-300 text-lg font-normal text-center">
              Por favor complete los datos respectivos
            </p>
          </div>
        )}
      </div>
    </div>
  );

};

export default DoctorList;
