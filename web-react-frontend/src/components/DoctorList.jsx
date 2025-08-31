import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../routes/routesConfig";
import DoctorItem from "./DoctorItem";

const DoctorList = ({ agendas, specialty }) => {

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

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const handleSelectAgenda = async (agenda) => {
    setSelectedDoctor(agenda.medico);
    const { conMedico, ...sinMedico } = agenda;
    setSelectedAgenda(sinMedico);
    setSelectedTime(null);

    setLoadingSlots(true);
    let occupiedResp = [];

    try {
      // onChoose es la función que dispara la petición (handleChooseDoctor en el padre)
      const resp = await onChoose?.(agenda);

      // Intentamos extraer un array de slots ocupados de varias formas posibles
      if (!resp) {
        occupiedResp = [];
      } else if (Array.isArray(resp)) {
        occupiedResp = resp;
      } else if (Array.isArray(resp?.results)) {
        occupiedResp = resp.results;
      } else if (Array.isArray(resp?.slots)) {
        occupiedResp = resp.slots;
      } else if (Array.isArray(resp?.occupied_slots)) {
        occupiedResp = resp.occupied_slots;
      } else if (Array.isArray(resp?.horarios_ocupados)) {
        occupiedResp = resp.horarios_ocupados;
      } else if (Array.isArray(resp?.time_slots)) {
        occupiedResp = resp.time_slots;
      } else {
        // Si la estructura es otra, intenta detectar campos con strings dentro
        // (fallback: buscar cualquier array dentro del objeto)
        const arrays = Object.values(resp).filter((v) => Array.isArray(v));
        occupiedResp = arrays.length ? arrays[0] : [];
      }
    } catch (err) {
      console.error("Error al obtener slots ocupados:", err);
      occupiedResp = [];
    }

    const slots = generateTimeSlots(
      agenda.hora_inicio,
      agenda.hora_fin,
      agenda.time_slot_minutes,
      occupiedResp
    );

    setTimeSlots(slots);
    setLoadingSlots(false);
  };

  return (
    <div className="pb-20 px-10 bg-gradient-to-t from-[#e4f5f8c8]  ">
      <div className="bg-white rounded-2xl shadow-2xl p-5 md:py-10 md:px-12 max-w-5xl mx-auto fade-in-up">
        {/* Cabecera */}
        <div className="flex items-center border-b-[3px] border-gray-200 pb-3 mb-4">
          <div className="flex items-center justify-center w-10 h-9 rounded-full bg-[#62abaa] text-white text-lg font-medium mr-3">
            2
          </div>
          <h3 className="text-2xl font-semibold text-[#62abaa]">
            Elegir Doctor
          </h3>
        </div>

        {/* Lista de doctores */}
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
      </div>
    </div>
  );
};

export default DoctorList;
