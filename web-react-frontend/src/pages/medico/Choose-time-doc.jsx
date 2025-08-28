import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Timetable from "../../components/Timetable";

export default function ChooseTimeDoc() {
  const location = useLocation();
  const navigate = useNavigate();

  // Leer doctor y date desde location.state
  const { doctor, date } = location.state || {};

  // Si falta doctor o date, redirigir al Home (evita navegar durante render)
  useEffect(() => {
    if (!doctor || !date) {
      navigate("/", { replace: true });
    }
  }, [doctor, date, navigate]);

  // Mientras se redirige, no renderices nada
  if (!doctor || !date) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Selecciona un horario con{" "}
            <span className="text-blue-600">{doctor.nombre}</span>
          </h1>

          <p className="text-gray-600 mb-4">
            Fecha seleccionada: <span className="font-medium">{date}</span>
          </p>


      
          {/* Pasamos doctor y date a Timetable */}
          <Timetable doctor={doctor} date={date} />
        </div>
      </div>
    </div>
  );
}
