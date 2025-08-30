import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Timetable from "../../components/Timetable";
import PerfilDoc from "../../components/PerfilDoc";
import Footer from "../../layouts/Footer";

export default function ChooseTimeDoc() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const agendaId = searchParams.get("agenda");
  const [agendaData, setAgendaData] = useState(null);

  // Leer doctor y date desde location.state
  const { doctor, date, specialty, agenda } = location.state || {};

  // Si falta doctor o date, redirigir al Home (evita navegar durante render)
  useEffect(() => {
    if (!doctor || !date) {
      navigate("/", { replace: true });
    }
  }, [doctor, date, navigate]);

  // Mientras se redirige, no renderices nada
  if (!doctor || !date) return null;


  // ── FUNCIONES DE FECHA ──
  const parseToLocalDate = (d) => {
    if (!d) return null;
    if (d instanceof Date) return d;
    if (typeof d === "number") return new Date(d);
    if (typeof d === "string") {
      const ymd = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (ymd) {
        const y = parseInt(ymd[1], 10);
        const m = parseInt(ymd[2], 10) - 1;
        const day = parseInt(ymd[3], 10);
        return new Date(y, m, day);
      }
      return new Date(d);
    }
    return null;
  };

  const dateObj = parseToLocalDate(date);

  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : date || "";

  const capitalizedDate = formattedDate
    ? formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    : "";




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
            Fecha seleccionada: <span className="font-medium">{capitalizedDate}</span>
          </p>
        </div>

        {/* Sección con PerfilDoc (izquierda) y Timetable (derecha) */}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-6">
          {/* Perfil del doctor (1/3 del ancho) */}
          <div className="col-span-1">
            <PerfilDoc doctor={doctor} />
          </div>

          {/* Horarios disponibles */}
          <div className="col-span-2 bg-white shadow-lg rounded-2xl">
          <div className="py-6 text-center shadow-md  mb-5">
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
