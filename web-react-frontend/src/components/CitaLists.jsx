import React, { useState, useEffect } from "react";
import { formatFechaHora } from "../utils/formtDateToString";

export default function CitaLists({ agenda, loadCita, showCita }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!agenda || !agenda.id) {
      setCitas([]);
      return;
    }

    const fetchCitas = async () => {
      setLoading(true);
      setError(null); 
      try {
        const data = await loadCita(agenda.id);
        setCitas(data);
      } catch (err) {
        console.error("Error al cargar las citas:", err);
        setError("No se pudieron cargar las citas. Inténtalo de nuevo.");
      } finally {
        setLoading(false); 
      }
    };

    fetchCitas();
  }, [agenda, loadCita]); 

  const renderContent = () => {
    if (!agenda) {
      return (
        <p className="text-sm text-gray-500">
          Selecciona una agenda para ver las citas.
        </p>
      );
    }
    if (loading) {
      return <p className="text-sm text-gray-500">Cargando citas...</p>;
    }
    if (error) {
      return <p className="text-sm text-red-500">{error}</p>;
    }
    if (citas.length === 0) {
      return (
        <p className="text-sm text-gray-500">
          No hay citas registradas para esta agenda.
        </p>
      );
    }
    return (
      <ul className="space-y-2">
        {citas.map((cita) => (
          <li
            key={cita.id}
            className="p-3 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="font-medium text-sm">{`${
                cita.paciente?.usuario?.nombres ?? "N/A"
              } ${cita.paciente?.usuario?.apellidos ?? ""}`}</div>
              <div className="text-xs text-gray-600">
                {/* Asumiendo que estos campos vienen en el objeto 'cita' */}
                {formatFechaHora(cita.fecha_hora_establecida)} -{" "}
                {cita.estado?.nombre ?? "Pendiente"}
              </div>
            </div>
            <button
              onClick={() => showCita(cita)}
              className="px-3 py-1 bg-[#1DA1ED] text-white rounded-md text-xs font-semibold hover:bg-[#1A90D9]"
            >
              Ver Cita
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex-1 overflow-auto min-h-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium">Citas</h2>
        <div className="text-sm text-gray-600">
          {agenda
            ? `Agenda: ${
                agenda.medico_especialidad?.especialidad?.nombre ?? ""
              } - ${new Date(
                agenda.fecha + "T00:00:00" // Previene problemas de zona horaria
              ).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}`
            : "Ninguna agenda seleccionada"}
        </div>
      </div>

      <div className="mb-4">{renderContent()}</div>
    </div>
  );
}
