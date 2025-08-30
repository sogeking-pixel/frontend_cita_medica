import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";

export default function Timetable({ doctor, date }) {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);

  if (!doctor || !date) {
    return (
      <p className="p-6 text-red-500">
        No se recibió información del doctor o de la fecha.
      </p>
    );
  }

  // generar horarios
  const generateTimeSlots = () => {
    const slots = [];
    const start = 8;
    const end = 20;
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleConfirmClick = () => {
    if (!selectedTime) return;
    navigate(getRoute("CitaFinish").path, {
      state: { doctor, date, time: selectedTime },
    });
  };

  return (
    <div className="max-w-5xl mx-auto ">

      {/* Horarios */}
      <div className=" rounded-xl  p-3">
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <div
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`cursor-pointer border rounded-2xl py-2 text-base text-center transition
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

        {/* Confirmar */}
        <div className="flex mt-6 md:justify-end">
          <Button onClick={handleConfirmClick} disabled={!selectedTime}className="w-full md:w-auto">
            Confirmar horario
          </Button>
        </div>
      </div>
    </div>
  );
}
