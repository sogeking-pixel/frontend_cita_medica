import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Doctor1 from "../assets/images/Doctor1.jpg"
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";

const DoctorList = ({ doctores, selectedDate }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const handleConfirmClick = () => {
     navigate(getRoute("CitaFinish").path);
  };
  // Función para parsear la fecha
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();

    // Caso formato yyyy-mm-dd (del input date)
    if (dateStr.includes("-")) {
      return new Date(dateStr + "T00:00:00");
    }

    // Caso formato dd/mm/yyyy
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");
      return new Date(year, month - 1, day);
    }

    // Por si viene de otra forma
    return new Date(dateStr);
  };

  const [currentDate, setCurrentDate] = useState(parseDate(selectedDate));

  useEffect(() => {
    setCurrentDate(parseDate(selectedDate));
  }, [selectedDate]);

  // Generar horas cada 30 min
  const generateTimeSlots = () => {
    const slots = [];
    let start = 8; // 8 AM
    let end = 22; // 6 PM
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className=" pb-60  px-3 bg-gradient-to-t from-[#e4f5f8c8] ">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-[1500px] mx-auto">
        {/* Cabecera */}
        <div className="flex items-center border-b-[3px] border-gray-200 pb-3 mb-4">
          <div className="flex items-center justify-center w-10 h-9 rounded-full bg-[#62abaa] text-white text-lg font-medium mr-3">
            2
          </div>
          <h3 className="text-2xl font-semibold text-[#62abaa]">
            Elegir Doctor
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lista de doctores (siempre visible) */}
          <div className="space-y-3">
            {doctores.map((doc) => (
              <div
                key={doc.id}
                className={`flex flex-col md:flex-row items-start md:items-center bg-white  rounded-lg p-3 shadow-md gap-4 cursor-pointer ${
                  selectedDoctor?.id === doc.id
                    ? "border-[#62abaa] border-3"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-800">
                    {doc.nombre}
                  </p>
                  <span className="text-sm text-gray-600">
                    {doc.experience} años de experiencia
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="bg-[#62abaa] hover:bg-[#4f9b95] text-white px-4 py-2 rounded-lg"
                  >
                    Elegir
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detalle del doctor */}
          <div>
            {selectedDoctor && (
              <div className="grid gap-6">
                {/* Info Doctor */}
                <div className="bg-gray-50 rounded-xl p-4 shadow">
                  <img
                    src={selectedDoctor.foto || Doctor1}
                    alt={selectedDoctor.nombre}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h4 className="text-xl font-semibold">
                    {selectedDoctor.nombre}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedDoctor.experience} años de experiencia
                  </p>
                  <p className="mt-2 text-gray-700 font-semibold">
                    {selectedDoctor.especialidad}
                  </p>
                  <p className="text-justify">
                    Soy cardiólogo, con amplia experiencia en el diagnóstico,
                    tratamiento y seguimiento de pacientes con enfermedades
                    cardiovasculares. A lo largo de mi carrera he atendido una
                    gran variedad de casos clínicos, desde hipertensión arterial
                    y arritmias hasta insuficiencia cardíaca y cardiopatías
                    isquémicas.
                  </p>
                  <p className="mt-2 text-gray-700">
                    {selectedDoctor.direccion}
                  </p>
                </div>

                {/* Horarios */}
                <div className="bg-gray-50 rounded-xl p-4 shadow flex flex-col h-full min-h-[400px] md:min-h-[520px]">
                  <div className="flex justify-center items-center mb-6">
                    <span className="font-medium">
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
                        className={`cursor-pointer border rounded py-2 text-sm text-center transition ${
                          selectedTime === time
                            ? "bg-green-200 border-green-400 font-semibold"
                            : "bg-blue-50 hover:bg-blue-100"
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Botón */}
                  <div className="flex justify-end mt-auto pb-5">
                    <Button
                      onClick={handleConfirmClick}
                      disabled={!selectedTime}
                    >
                      Confirmar horario
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
