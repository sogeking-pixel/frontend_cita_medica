import React, { useEffect, useMemo, useState } from "react";
import Header from "../../layouts/HeaderMedico";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SelectEspecialidad from "../../components/medico/SelectEspecialidad";

const localizer = momentLocalizer(moment);

export default function Agenda() {
  const STORAGE_KEY = "doctor_availabilities";
  const APPTS_KEY = "doctor_appointments";

  // form state (inside modal)
  const [mode, setMode] = useState("fecha"); // "fecha" o "recurrente"
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [recurringDays, setRecurringDays] = useState({});
  const [notes, setNotes] = useState("");
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  // UI state
  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
  const [selectedEspecialidad, setSelectedEspecialidad] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  // appointments (simple localStorage stub)
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setSlots(JSON.parse(raw));
    const rawA = localStorage.getItem(APPTS_KEY);
    if (rawA) setAppointments(JSON.parse(rawA));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem(APPTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const weekdays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  function toggleRecurring(dayIndex) {
    setRecurringDays((d) => ({ ...d, [dayIndex]: !d[dayIndex] }));
  }

  function minutesFromTime(t) {
    if (!t) return null;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  function validateSlot() {
    setError("");
    const s = minutesFromTime(startTime);
    const e = minutesFromTime(endTime);
    if (!startTime || !endTime) {
      setError("Debe indicar hora de inicio y fin.");
      return false;
    }
    if (s >= e) {
      setError("La hora de inicio debe ser anterior a la hora de fin.");
      return false;
    }
    if (duration <= 0) {
      setError("Duración inválida.");
      return false;
    }
    if (e - s < duration) {
      setError("El rango es menor que la duración de la cita.");
      return false;
    }
    if (mode === "fecha" && !date) {
      setError("Debe seleccionar una fecha.");
      return false;
    }
    if (
      mode === "recurrente" &&
      Object.values(recurringDays).every((v) => !v)
    ) {
      setError("Debe seleccionar al menos un día recurrente.");
      return false;
    }
    return true;
  }

  function addSlot() {
    if (!validateSlot()) return;
    const newSlot = {
      id: Date.now(),
      date: mode === "fecha" ? date : null,
      startTime,
      endTime,
      duration: Number(duration),
      recurringDays:
        mode === "recurrente"
          ? Object.keys(recurringDays)
              .filter((k) => recurringDays[k])
              .map(Number)
          : [],
      notes,
      status: "published",
    };
    setSlots((s) => [newSlot, ...s]);
    // reset minimal and close modal
    setDate("");
    setStartTime("");
    setEndTime("");
    setDuration(30);
    setRecurringDays({});
    setNotes("");
    setShowCreateModal(false);
  }

  function removeSlot(id) {
    setSlots((s) => s.filter((x) => x.id !== id));
  }

  // appointments helpers
  function getAppointmentsForDate(isoDate) {
    if (!isoDate) return [];
    return appointments.filter((a) => a.startAt.slice(0, 10) === isoDate);
  }

  function markAppointmentAttended(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "attended" } : a))
    );
  }

  // fechas y restricciones: pasado mañana
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const minSelectableDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 2);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [today]);

  // genera conteos para el calendario (próximos N días)
  const calendarEvents = useMemo(() => {
    const DAYS = 90;
    const map = new Map();
    for (let i = 0; i <= DAYS; i++) {
      const dt = new Date(minSelectableDate);
      dt.setDate(minSelectableDate.getDate() + i);
      const key = dt.toISOString().slice(0, 10);
      map.set(key, 0);
    }

    slots.forEach((s) => {
      if (s.date) {
        if (map.has(s.date)) map.set(s.date, map.get(s.date) + 1);
      } else if (s.recurringDays && s.recurringDays.length) {
        for (let i = 0; i <= DAYS; i++) {
          const dt = new Date(minSelectableDate);
          dt.setDate(minSelectableDate.getDate() + i);
          const dayIndex = (dt.getDay() + 6) % 7; // 0 = lunes
          if (s.recurringDays.includes(dayIndex)) {
            const key = dt.toISOString().slice(0, 10);
            map.set(key, (map.get(key) || 0) + 1);
          }
        }
      }

      // also count appointments present for date range
    });

    // count appointments too so calendars reflect occupied days
    appointments.forEach((a) => {
      const key = a.startAt.slice(0, 10);
      if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
    });

    const evts = [];
    for (const [key, count] of map.entries()) {
      if (count > 0) {
        const start = new Date(`${key}T00:00:00`);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        evts.push({
          id: key,
          title: `${count} disponibilidad${count > 1 ? "es" : ""}`,
          start,
          end,
          allDay: true,
          count,
          date: key,
        });
      }
    }
    return evts;
  }, [slots, appointments, minSelectableDate]);

  // cuando el usuario selecciona un día en el calendario
  function handleSelectSlot(slotInfo) {
    const iso = slotInfo.start.toISOString().slice(0, 10);
    const sel = new Date(slotInfo.start);
    sel.setHours(0, 0, 0, 0);
    if (sel < minSelectableDate) return; // no permitir
    setSelectedDate(iso);
    setShowAppointments(false);
  }

  // dayPropGetter para deshabilitar días antes de pasado mañana
  function dayPropGetter(date) {
    const cellDate = new Date(date);
    cellDate.setHours(0, 0, 0, 0);
    if (cellDate < minSelectableDate)
      return {
        style: {
          backgroundColor: "#f8fafc",
          color: "#bbb",
          pointerEvents: "none",
        },
      };
    return {};
  }

  // lista de disponibilidades que aplican a una fecha seleccionada
  function listSlotsForDate(isoDate) {
    if (!isoDate) return [];
    const dt = new Date(`${isoDate}T00:00:00`);
    const dayIndex = (dt.getDay() + 6) % 7; // 0 = lunes
    const res = [];
    slots.forEach((s) => {
      if (s.date === isoDate) res.push({ ...s, type: "Fecha específica" });
      else if (s.recurringDays && s.recurringDays.includes(dayIndex))
        res.push({ ...s, type: "Recurrente" });
    });
    res.sort((a, b) => a.startTime.localeCompare(b.startTime));
    return res;
  }

  const selectedSlots = useMemo(
    () => listSlotsForDate(selectedDate),
    [selectedDate, slots]
  );

  // helper: preview próximas N ocurrencias para una regla recurrente simple
  function previewOccurrencesForRule(rule, count = 5) {
    const out = [];
    if (rule.date) return [rule.date];
    const start = new Date(minSelectableDate);
    let i = 0;
    while (out.length < count && i < 365) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      const dayIndex = (dt.getDay() + 6) % 7;
      if (rule.recurringDays && rule.recurringDays.includes(dayIndex))
        out.push(dt.toISOString().slice(0, 10));
      i++;
    }
    return out;
  }

  // appointment summary for selected date
  const appointmentSummary = useMemo(() => {
    const list = getAppointmentsForDate(selectedDate);
    const total = list.length;
    const attended = list.filter((a) => a.status === "attended").length;
    const booked = list.filter(
      (a) => a.status === "booked" || a.status === "confirmed"
    ).length;
    return { total, attended, booked };
  }, [selectedDate, appointments]);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen font-['Outfit'] bg-[#f5f5f5] pt-26 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Agenda médico</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendario (izquierda) */}
            <div className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium mb-3">Calendario</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Haz clic en un día (a partir de pasado mañana) para ver
                    disponibilidades.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-3 py-2 bg-[#1DA1ED] text-white rounded"
                  >
                    Nueva disponibilidad
                  </button>
                </div>
              </div>

              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 520 }}
                views={["month"]}
                selectable
                onSelectSlot={handleSelectSlot}
                dayPropGetter={dayPropGetter}
                popup={false}
                components={{
                  event: ({ event }) => (
                    <span className="text-xs font-medium">{event.title}</span>
                  ),
                }}
              />

              <div className="mt-3 text-sm text-gray-600">
                Seleccionado: {selectedDate || "—"}
              </div>
            </div>

            {/* Right column: Agendas creadas + Detalle del día (incluye citas) */}
            <div className="flex flex-col gap-6">
              {/* Agendas creadas: lista de reglas/publicadas */}
              <div className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-lg font-medium mb-3">Agendas creadas</h2>
                {slots.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No hay agendas creadas.
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-48 overflow-auto">
                    {slots.map((s) => (
                      <li
                        key={s.id}
                        className="p-3 border rounded flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {s.date
                              ? `Fecha: ${s.date}`
                              : `Recurrente: ${
                                  s.recurringDays && s.recurringDays.length
                                    ? s.recurringDays
                                        .map((d) => weekdays[d])
                                        .join(", ")
                                    : "—"
                                }`}
                          </div>
                          <div className="text-xs text-gray-600">
                            {s.startTime} - {s.endTime} · {s.duration} min ·{" "}
                            {s.notes || "-"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              /* abrir modal para editar (se podría precargar) */ setShowCreateModal(
                                true
                              );
                            }}
                            className="px-2 py-1 border rounded text-xs"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => removeSlot(s.id)}
                            className="px-2 py-1 border rounded text-xs"
                          >
                            Eliminar
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDate(s.date || selectedDate);
                              setShowAppointments(true);
                            }}
                            className="px-2 py-1 bg-[#1DA1ED] text-white rounded text-xs"
                          >
                            Ver citas
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Detalle del día seleccionado + resumen y citas */}
              <div className="bg-white rounded-2xl shadow p-5 flex-1 overflow-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-medium">Detalle del día</h2>
                  <div className="text-sm text-gray-600">
                    {selectedDate
                      ? `Mostrando ${selectedDate}`
                      : "Selecciona un día"}
                  </div>
                </div>

                {/* resumen general */}
                <div className="mb-4 flex gap-4 items-center">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">
                      Disponibilidades
                    </div>
                    <div className="text-xl font-semibold">
                      {selectedSlots.length}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Citas totales</div>
                    <div className="text-xl font-semibold">
                      {appointmentSummary.total}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Pendientes</div>
                    <div className="text-xl font-semibold">
                      {appointmentSummary.booked}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Atendidas</div>
                    <div className="text-xl font-semibold">
                      {appointmentSummary.attended}
                    </div>
                  </div>
                </div>

                {/* reglas/slots que aplican */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Agendas que aplican</h3>
                  {selectedSlots.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay agendas aplicando en esa fecha.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedSlots.map((s) => (
                        <li
                          key={s.id}
                          className="p-3 border rounded flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-sm">{s.type}</div>
                            <div className="text-xs text-gray-600">
                              {s.startTime} - {s.endTime} · {s.duration} min ·{" "}
                              {s.notes || "-"}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {s.date ? "Fecha específica" : "Recurrente"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Citas del día */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Citas</h3>
                    {selectedDate && (
                      <button
                        onClick={() => setShowAppointments((v) => !v)}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        {showAppointments ? "Ocultar" : "Mostrar"} lista
                      </button>
                    )}
                  </div>

                  {showAppointments && (
                    <div>
                      {getAppointmentsForDate(selectedDate).length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No hay citas para este día.
                        </p>
                      ) : (
                        <table className="min-w-full text-left text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2">Hora</th>
                              <th className="py-2">Paciente</th>
                              <th className="py-2">Estado</th>
                              <th className="py-2">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getAppointmentsForDate(selectedDate).map((a) => (
                              <tr key={a.id} className="border-b">
                                <td className="py-2">
                                  {a.startAt.slice(11, 16)}
                                </td>
                                <td className="py-2">{a.patientName}</td>
                                <td className="py-2">{a.status}</td>
                                <td className="py-2">
                                  {a.status !== "attended" && (
                                    <button
                                      onClick={() =>
                                        markAppointmentAttended(a.id)
                                      }
                                      className="px-2 py-1 border rounded mr-2"
                                    >
                                      Marcar atendida
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Create modal */}
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black opacity-40"
                onClick={() => setShowCreateModal(false)}
              ></div>
              <div className="bg-white rounded-xl shadow-lg z-60 w-full max-w-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Nueva disponibilidad</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500"
                  >
                    Cerrar
                  </button>
                </div>

                <SelectEspecialidad
                value={selectedEspecialidad}
                onChange={setSelectedEspecialidad}
                label="Elige Especialidad"
                />

                <label className="block mb-3">
                  Modo
                  <select
                    className="mt-1 block w-full border rounded p-2"
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    <option value="fecha">Por fecha</option>
                    <option value="recurrente">Recurrente</option>
                  </select>
                </label>

                {mode === "fecha" && (
                  <label className="block mb-3">
                    Fecha
                    <input
                      type="date"
                      className="mt-1 block w-full border rounded p-2"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                )}

                {mode === "recurrente" && (
                  <div className="mb-3">
                    <p className="text-sm mb-2">Días recurrentes</p>
                    <div className="flex gap-2 flex-wrap">
                      {weekdays.map((d, i) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleRecurring(i)}
                          className={`px-3 py-1 rounded-full border ${
                            recurringDays[i]
                              ? "bg-[#1DA1ED] text-white"
                              : "bg-white"
                          }`}
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
                    />
                  </label>
                  <label className="flex-1">
                    Hora fin
                    <input
                      type="time"
                      className="mt-1 block w-full border rounded p-2"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </label>
                </div>

                <label className="block mb-3">
                  Duración (min)
                  <select
                    className="mt-1 block w-40 border rounded p-2"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    {[10, 15, 20, 30, 45, 60].map((d) => (
                      <option key={d} value={d}>
                        {d} min
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block mb-3">
                  Notas
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded p-2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>

                {error && <p className="text-red-600 mb-3">{error}</p>}

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addSlot}
                    className="px-4 py-2 bg-[#263248] text-white rounded"
                  >
                    Publicar disponibilidad
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <strong>Preview próximas ocurrencias:</strong>
                  <div className="mt-2">
                    {mode === "fecha" && date ? (
                      <div>{date}</div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {previewOccurrencesForRule({
                          recurringDays: Object.keys(recurringDays)
                            .filter((k) => recurringDays[k])
                            .map(Number),
                        }).map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
