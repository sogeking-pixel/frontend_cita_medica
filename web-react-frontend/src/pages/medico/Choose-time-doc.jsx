import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Timetable from "../../components/Timetable";
import PerfilDoc from "../../components/PerfilDoc";
import Footer from "../../layouts/Footer";

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
    <div className="min-h-screen bg-gray-50 font-['Outfit']">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-6 mt-7 mb-15">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2 text-gray-600">
            Selecciona un horario con{" "}
            <span className="text-[#3e7c88]">{doctor.nombre}</span>
          </h1>

          <p className="text-gray-600 mb-1">
            Fecha seleccionada: <span className="font-medium">{date}</span>
          </p>
        </div>

        {/* Sección con PerfilDoc (izquierda) y Timetable (derecha) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Perfil del doctor (1/3 del ancho) */}
          <div className="col-span-1">
            <PerfilDoc doctor={doctor} />
          </div>

          {/* Horarios disponibles */}
          <div className="col-span-2 bg-white shadow-lg rounded-2xl">
          <div className="py-6 text-center  mb-4 shadow-md  mb-5">
            <h2 className="text-xl font-light text-gray-400">Horarios Disponibles</h2>
          </div>
            <Timetable doctor={doctor} date={date} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
