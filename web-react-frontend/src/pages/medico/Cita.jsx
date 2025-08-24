import React, { useEffect, useMemo, useState } from "react";
import Header from "../../layouts/HeaderMedico";
import SelectEspecialidad from "../../components/medico/SelectEspecialidad";

// CitasMedico.jsx
// Página de administración de citas para el médico.
// - Lista de citas (lee de localStorage `doctor_appointments`) — reemplazar por API fácilmente
// - Filtros: fecha, estado, búsqueda por paciente
// - Acciones rápidas: marcar como atendida, cancelar
// - Modal de detalle de cita

const APPTS_KEY = "doctor_appointments";

export default function Cita() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // '', 'booked','confirmed','attended','cancelled'
  const [filterEspecialidad, setFilterEspecialidad] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const [selected, setSelected] = useState(null); // cita seleccionada para modal

  useEffect(() => {
    const raw = localStorage.getItem(APPTS_KEY);
    if (raw) setAppointments(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(APPTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  function resetFilters() {
    setFilterDate("");
    setFilterStatus("");
    setFilterEspecialidad("");
    setQuery("");
    setPage(1);
  }

  function markAttended(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "attended" } : a))
    );
  }
  function cancelAppointment(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }

  const filtered = useMemo(() => {
    let list = [...appointments];
    if (filterDate)
      list = list.filter((a) => a.startAt.slice(0, 10) === filterDate);
    if (filterStatus) list = list.filter((a) => a.status === filterStatus);
    if (filterEspecialidad)
      list = list.filter((a) => a.especialidadId === filterEspecialidad);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          (a.patientName || "").toLowerCase().includes(q) ||
          (a.patientEmail || "").toLowerCase().includes(q)
      );
    }
    // ordenar por startAt asc
    list.sort((x, y) => x.startAt.localeCompare(y.startAt));
    return list;
  }, [appointments, filterDate, filterStatus, filterEspecialidad, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const summary = useMemo(() => {
    const total = appointments.length;
    const upcoming = appointments.filter(
      (a) => new Date(a.startAt) >= new Date()
    ).length;
    const attended = appointments.filter((a) => a.status === "attended").length;
    const cancelled = appointments.filter(
      (a) => a.status === "cancelled"
    ).length;
    return { total, upcoming, attended, cancelled };
  }, [appointments]);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen font-['Outfit'] bg-[#f5f5f5] pt-26 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Citas</h1>
            <div className="text-right">
              <div className="text-xs text-gray-500">Resumen</div>
              <div className="text-sm">
                Total: {summary.total} · Próximas: {summary.upcoming} ·
                Atendidas: {summary.attended} · Canceladas: {summary.cancelled}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 mb-6">
            <div className="flex gap-6 flex-wrap items-center">
              {/* Filtro Fecha */}
              <div className="flex items-center gap-2 text-sm">
               <label >Fecha:</label>
                <input
                  type="date"
                  className="rounded p-1"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

            <div className="flex items-center gap-2 text-sm">
              <label>Estado:</label>
                <select
                  className="ml-2 border rounded p-1"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="booked">Booked</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="attended">Attended</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              
             <div className="flex items-center gap-2 text-sm">
              <SelectEspecialidad
                value={filterEspecialidad}
                onChange={setFilterEspecialidad}
                label="Ver por especialidad:"
                extraOptions={[{ value: "", label: "Todas" }]} // igual que en Dashboard
              />
              </div>

              <label className="flex-1 text-sm">
                Buscar paciente
                <input
                  className="ml-2 w-full border rounded p-1"
                  placeholder="Nombre o email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

                  {/* Botones */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 border rounded"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setPage(1);
                  }}
                  className="px-3 py-1 bg-[#263248] text-white rounded"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Fecha / Hora</th>
                    <th className="py-2">Paciente</th>
                    <th className="py-2">Motivo / Nota</th>
                    <th className="py-2">Estado</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-gray-500"
                      >
                        No hay citas que coincidan.
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((a) => (
                      <tr key={a.id} className="border-b hover:bg-gray-50">
                        <td className="py-2">
                          {a.startAt.slice(0, 10)}{" "}
                          <span className="text-xs text-gray-500">
                            {a.startAt.slice(11, 16)}
                          </span>
                        </td>
                        <td className="py-2">
                          {a.patientName}{" "}
                          <div className="text-xs text-gray-400">
                            {a.patientEmail || ""}
                          </div>
                        </td>
                        <td className="py-2">{a.notes || "-"}</td>
                        <td className="py-2">{a.status}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelected(a)}
                              className="px-2 py-1 border rounded text-xs"
                            >
                              Ver
                            </button>
                            {a.status !== "attended" &&
                              a.status !== "cancelled" && (
                                <>
                                  <button
                                    onClick={() => markAttended(a.id)}
                                    className="px-2 py-1 border rounded text-xs"
                                  >
                                    Marcar atendida
                                  </button>
                                  <button
                                    onClick={() => cancelAppointment(a.id)}
                                    className="px-2 py-1 border rounded text-xs"
                                  >
                                    Cancelar
                                  </button>
                                </>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {(page - 1) * PER_PAGE + 1}–
                {Math.min(
                  page * PER_PAGE,
                  1
                )}{" "}
                de {2}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded"
                >
                  Anterior
                </button>
                <div className="px-3 py-1 border rounded">
                  {page} / {totalPages}
                </div>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 border rounded"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {/* Detail modal */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black opacity-40"
                onClick={() => setSelected(null)}
              ></div>
              <div className="bg-white rounded-xl shadow-lg z-60 w-full max-w-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Detalle de cita</h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-500"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Paciente</div>
                    <div className="font-medium">{selected.patientName}</div>
                    <div className="text-xs text-gray-400">
                      {selected.patientEmail}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Fecha / Hora</div>
                    <div className="font-medium">
                      {selected.startAt.slice(0, 10)}{" "}
                      {selected.startAt.slice(11, 16)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Duración: {selected.duration || "-"} min
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500">Notas</div>
                  <div className="text-sm">{selected.notes || "-"}</div>
                </div>

                <div className="flex gap-3 justify-end">
                  {selected.status !== "attended" && (
                    <button
                      onClick={() => {
                        markAttended(selected.id);
                        setSelected(null);
                      }}
                      className="px-4 py-2 bg-[#263248] text-white rounded"
                    >
                      Marcar atendida
                    </button>
                  )}
                  {selected.status !== "cancelled" && (
                    <button
                      onClick={() => {
                        cancelAppointment(selected.id);
                        setSelected(null);
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
