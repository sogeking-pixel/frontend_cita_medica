import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Doctor1 from "../assets/images/Doctor1.jpg"
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";

const DoctorList = ({ doctores, selectedDate, onChoose }) => { // onChoose añadido por si lo usas
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
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

   useEffect(() => {
    setCurrentDate(parseDate(selectedDate));
  }, [selectedDate]);

  // ✅ Confirmar cita
  const handleConfirmClick = () => {
    if (!selectedDoctor || !selectedTime) return;

    navigate(getRoute("CitaFinish").path, {
      state: {
        doctor: {
          ...selectedDoctor,
          foto: selectedDoctor.foto || Doctor1, // fallback
        },
        specialty: selectedDoctor.especialidad,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

   //  Generar horarios
  const generateTimeSlots = () => {
    const slots = [];
    const start = 8;
    const end = 22;
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setSelectedTime(null);
    onChoose?.(doc);
  };

  return (
    <div className="pb-60 px-3 bg-gradient-to-t from-[#e4f5f8c8]">
  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-[1500px] mx-auto">
    {/* Cabecera */}
    <div className="flex items-center border-b-[3px] border-gray-200 pb-3 mb-4">
      <div className="flex items-center justify-center w-10 h-9 rounded-full bg-[#62abaa] text-white text-lg font-medium mr-3">
        2
      </div>
      <h3 className="text-2xl font-semibold text-[#62abaa]">Elegir Doctor</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Lista de doctores */}
      <div className="space-y-3">
        {doctores.map((doc) => (
          <div
            key={doc.id}
            className={`flex items-center gap-4 p-4 bg-[#fbf9f9] rounded-2xl shadow-md border transition
              ${selectedDoctor?.id === doc.id ? "bg-blue-50 border-[#62abaa] border-[2px] " : "bg-[#fbf9f9] border-gray-200"}`}
          >
            {/* Avatar */}
            <img
              src={doc.foto || Doctor1}
              alt={doc.nombre}
              className="w-20 h-20 rounded-full object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              {/* Nombre + experiencia */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-base font-semibold text-gray-900">{doc.nombre}</p>
                {doc.experience !== undefined && (
                  <p className="text-sm text-gray-500 mr-9 ">
                    {doc.experience} {doc.experience === 1 ? "año" : "años"} de experiencia
                  </p>
                )}
              </div>

              {/* Especialidad */}
              <p className="text-sm  text-gray-700">
                {doc.especialidad || "Especialidad"}
              </p>
            </div>

            {/* Botón Elegir */}
            <button
              onClick={() => handleSelectDoctor(doc)}
              className="bg-[#62abaa] hover:bg-[#4f9b95] text-white px-4 py-2 rounded-xl"
            >
              Elegir
            </button>
          </div>
        ))}
      </div>

          {/* Solo HORARIOS (sin detalle del doctor) */}
          <div>
            {selectedDoctor ? (
              <div className="bg-[#fbfaf9] rounded-xl p-4 shadow flex flex-col h-full min-h-[340px]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Horarios</h4>
                  <span className="text-sm font-medium text-gray-700">
                    {currentDate.toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>

                {/* Horas */}
                <div className="grid grid-cols-5 gap-3">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`cursor-pointer border rounded-xl py-2 text-sm text-center transition
                        ${
                          selectedTime === time
                            ? "bg-emerald-200 border-emerald-400 font-semibold"
                            : "bg-blue-50 hover:bg-blue-100 border-blue-100"
                        }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                {/* Botón */}
                <div className="flex justify-end mt-auto pt-6">
                  <Button onClick={handleConfirmClick} disabled={!selectedTime || !selectedDoctor}>
                    Confirmar horario
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#F9FAFB] rounded-xl p-6 text-gray-400 text-sm shadow text-center">
                Selecciona un doctor para ver los horarios disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
