import React, { useEffect,  useState, useCallback } from "react";
import Modal from "../Modal";
import SelectEspecialidad from "./SelectEspecialidad";
import moment from "moment";

function minutesFromTime(timeString) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function getRecurringDates(selectedDays) {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(tomorrow);
    currentDate.setDate(tomorrow.getDate() + i);

    const dayIndex = currentDate.getDay();

    if (selectedDays[dayIndex]) {
      const dateString = currentDate.toISOString().split("T")[0];
      dates.push(dateString);
    }
  }
  return dates;
}

export default function CreateAgendaModal({
  open,
  onClose,
  onCreate,
  onSearchMedicoEspecialidad,
  especialidadOptions,
  loadingEsp,
  especialidadesError,
  weekdays,
}) {
  const [mode, setMode] = useState("fecha");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [recurringDays, setRecurringDays] = useState({});
  const [selectedEspecialidad, setSelectedEspecialidad] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minSelectableDate = moment().add(1, "day").format("YYYY-MM-DD");
  const maxSelectableDate = moment().add(2, "months").format("YYYY-MM-DD");

  const validateForm = useCallback(() => {
    setFormError("");
    if (!selectedEspecialidad) {
      setFormError("Debes seleccionar una especialidad.");
      return false;
    }

    const startMinutes = minutesFromTime(startTime);
    const endMinutes = minutesFromTime(endTime);

    if (!startTime || !endTime) {
      setFormError("Debe indicar hora de inicio y fin.");
      return false;
    }
    if (startMinutes >= endMinutes) {
      setFormError("La hora de inicio debe ser anterior a la hora de fin.");
      return false;
    }
    if (Number(duration) <= 0) {
      setFormError("La duración debe ser un número positivo.");
      return false;
    }
    if (endMinutes - startMinutes < Number(duration)) {
      setFormError("El rango de horas es menor que la duración de una cita.");
      return false;
    }
    if (mode === "fecha" && !date) {
      setFormError("Debe seleccionar una fecha.");
      return false;
    }
    if (
      mode === "recurrente" &&
      Object.values(recurringDays).every((v) => !v)
    ) {
      setFormError("Debe seleccionar al menos un día recurrente.");
      return false;
    }
    return true;
  }, [
    date,
    duration,
    endTime,
    mode,
    recurringDays,
    startTime,
    selectedEspecialidad,
  ]);

  const resetForm = useCallback(() => {
    setMode("fecha");
    setDate("");
    setStartTime("");
    setEndTime("");
    setDuration(30);
    setRecurringDays({});
    setSelectedEspecialidad("");
    setFormError("");
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);
  
  const toggleRecurring = useCallback((dayIndex) => {
    setRecurringDays((prevDays) => ({
      ...prevDays,
      [dayIndex]: !prevDays[dayIndex],
    }));
  }, []);

  const handleCreate = useCallback(async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const result = await onSearchMedicoEspecialidad(agendaId);
      if (result != 1) throw new Error("No valido :/");
      const medicoEspecialidadId = result.results[0].id;
      const commonPayload = {
        hora_inicio: startTime,
        hora_fin: endTime,
        time_slot_minutes: duration,
        medico_especialidad: medicoEspecialidadId,
      };
      let payloads = [];

      if (mode == "fecha") {
        payloads.push({ ...commonPayload, fecha: date });
      }
      else {
        const datesForNextWeek = getRecurringDates(recurringDays);
        if (datesForNextWeek.length === 0) {
          setFormError(
            "No hay días aplicables en la próxima semana con tu selección."
          );
          setIsSubmitting(false);
          return;
        }
        payloads = datesForNextWeek.map((recurringDate) => ({
          ...commonPayload,
          fecha: recurringDate,
        }));
      }
      const results = await Promise.allSettled(
        payloads.map((p) => onCreate(p))
      );
    } catch (error) {
     console.error("Error al crear la agenda:", error);
     setFormError(error.message || "Ocurrió un error inesperado.");
    } finally {
       setIsSubmitting(false);
    }
  }, [
    validateForm,
    onSearchMedicoEspecialidad,
    selectedEspecialidad,
    startTime,
    endTime,
    duration,
    mode,
    date,
    recurringDays,
    onCreate,
    onClose,
  ]);


  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      buttonAccept={
        <button
          onClick={handleCreate}
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#263248] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Publicando..." : "Publicar disponibilidad"}
        </button>
      }
    >
      <SelectEspecialidad
        label="Elige Especialidad"
        value={selectedEspecialidad}
        onChange={setSelectedEspecialidad}
      />
      {loadingEsp && (
        <p className="text-sm text-gray-500">Cargando especialidades...</p>
      )}
      {especialidadesError && (
        <p className="text-sm text-red-500">Error cargando especialidades.</p>
      )}

      <label className="block mb-3">
        Modo
        <select
          className="mt-1 block w-full border rounded p-2"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="fecha">Por fecha</option>
          <option value="recurrente">Recurrente (1 semana)</option>
        </select>
      </label>

      {mode === "fecha" && (
        <label className="block mb-3">
          Fecha
          <input
            type="date"
            className="mt-1 block w-full border rounded p-2"
            min={minSelectableDate}
            max={maxSelectableDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isSubmitting}
          />
        </label>
      )}

      {mode === "recurrente" && (
        <div className="mb-3">
          <p className="text-sm mb-2">Días recurrentes (válido por 1 semana)</p>
          <div className="flex gap-2 flex-wrap">
            {weekdays.map((d, i) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleRecurring(i)}
                disabled={isSubmitting}
                className={`px-3 py-1 rounded-full border ${
                  recurringDays[i] ? "bg-[#1DA1ED] text-white" : "bg-white"
                } disabled:opacity-50`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <label className="flex-1">
          Hora inicio
          <input
            type="time"
            className="mt-1 block w-full border rounded p-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={isSubmitting}
          />
        </label>
        <label className="flex-1">
          Hora fin
          <input
            type="time"
            className="mt-1 block w-full border rounded p-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="block mb-3">
        Duración (min)
        <select
          className="mt-1 block w-40 border rounded p-2"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={isSubmitting}
        >
          {[10, 15, 20, 30, 45, 60].map((d) => (
            <option key={d} value={d}>
              {d} min
            </option>
          ))}
        </select>
      </label>

      {formError && <p className="text-red-600 mb-3">{formError}</p>}
    </Modal>
  );
}
