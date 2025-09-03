import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getRoute } from "../routes/routesConfig";
import useGetAgendaSlot from "../hooks/useAgendaSlot"; // Asegúrate de que la ruta sea correcta
import Lottie from "lottie-react";
import Loader from "../assets/animations/Load.json";

export default function Timetable({ doctor, especialidad, agenda }) {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    data: bookedSlots,
    loading,
    error,
    refetch,
  } = useGetAgendaSlot({
    agenda_id: agenda?.id,
    autoFetch: false,
  });

  const timeSlots = useMemo(() => {
    if (!agenda) return [];

    const slots = [];
    const { hora_inicio, hora_fin, time_slot_minutes } = agenda;

    const [startH, startM] = hora_inicio.split(":").map(Number);
    const startTimeInMinutes = startH * 60 + startM;

    const [endH, endM] = hora_fin.split(":").map(Number);
    const endTimeInMinutes = endH * 60 + endM;

    for (
      let t = startTimeInMinutes;
      t < endTimeInMinutes;
      t += time_slot_minutes
    ) {
      const hours = Math.floor(t / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (t % 60).toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
    }

    return slots;
  }, [agenda]);

  const bookedTimesSet = useMemo(
    () =>
      new Set(
        bookedSlots?.results?.map((slot) => slot.hora.substring(0, 5)) ?? []
      ),
    [bookedSlots]
  );

  const handleConfirmClick = () => {
    if (!selectedTime || !agenda) return;

    navigate(getRoute("CitaFinish").path, {
      state: {
        doctor,
        agenda,
        date: agenda.fecha, // La fecha viene de la agenda
        time: selectedTime,
        especialidad,
      },
    });
  };

  // Manejador para el botón de actualizar
  const handleRefresh = () => {
    setSelectedTime(null); // Opcional: limpiar la selección al refrescar
    refetch(agenda?.id);
  };


    //Visualizar el Loader al detectar agemda  y condicional por si no se ha seleccionado una agenda
  if (!agenda) {
    return loading ? (
      <div className="flex justify-center items-center py-16">
        <Lottie animationData={Load} style={{ height: 180 }} loop />
      </div>
    ) : (
      <div className="text-center p-10">
        No se ha proporcionado una agenda válida.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error al cargar los horarios.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-xl px-10 pb-10 pt-5">
        {/* Cabecera fija */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Seleccione un horario</h3>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>

        {/* Loader o lista de horarios */}
        {loading && !bookedSlots ? (
          <div className="flex justify-center items-center py-16">
            <Lottie animationData={Loader} style={{ height: 180 }} loop />
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {timeSlots.map((time) => {
              const isBooked = bookedTimesSet.has(time);
              const isSelected = selectedTime === time;

              return (
                <div
                  key={time}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  className={`border rounded-2xl py-2 text-base text-center transition
                    ${
                      isBooked
                        ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed"
                        : isSelected
                        ? "bg-emerald-200 border-emerald-400 font-semibold"
                        : "bg-blue-50 hover:bg-blue-100 border-blue-100 cursor-pointer"
                    }`}
                >
                  {time}
                </div>
              );
            })}
          </div>
        )}

        {/* Confirmar */}
        <div className="flex mt-8 md:justify-end">
          <Button
            onClick={handleConfirmClick}
            disabled={!selectedTime || loading}
            className="w-full md:w-auto"
          >
            Confirmar horario
          </Button>
        </div>
      </div>
    </div>
  );
}
