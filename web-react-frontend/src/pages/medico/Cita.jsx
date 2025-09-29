import React, { useEffect, useState } from "react";
import Header from "../../layouts/HeaderMedico";
import { useMedicoCitas } from "../../hooks/medico/useMedicoCitas";
import ShowCitaModal from "../../components/medico/ShowCitaModal";
import useEstadoCita from "../../hooks/useEstadoCita";
import {
  useChangeCitaToAtendiendo,
  useChangeCitaToAtendido,
} from "../../hooks/medico/useChangeCita";
import useGetMedicoEspecialidades from "../../hooks/medico/useMedicoEspecialidad";

// Constante para el tamaño de página para mantenerlo consistente
const PAGE_SIZE = 10;

export default function Cita() {
  // --- Hooks de Lógica y Datos ---
  const { pathAtendiendoCita } = useChangeCitaToAtendiendo();
  const { pathAtendidoCita } = useChangeCitaToAtendido();
  const { data: dataEstadosCitas, getAllEstadoCitas } = useEstadoCita();
  const {
      data: especialidades,
      refetch,
    } = useGetMedicoEspecialidades();
  // Hook principal para obtener las citas
  const { citas, pagination, loading, error, setParams } = useMedicoCitas({
    page_size: PAGE_SIZE,
  });

  // --- Estados locales para los filtros y UI ---
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEspecialidad, setFilterEspecialidad] = useState("");
  const [query, setQuery] = useState("");

  const [selectedCita, setSelectedCita] = useState(null);
  const [showCitaModal, setShowCitaModal] = useState(false);

  // Cargar los estados de las citas (para el dropdown) una sola vez
  useEffect(() => {
    getAllEstadoCitas();
  }, []);

  // --- Manejadores de Eventos y Funciones ---

  // Consolida los filtros y los envía al hook para una nueva búsqueda
  const applyFiltersAndFetch = (newPage = 1) => {
    const paramsToApply = {
      page: newPage,
      page_size: PAGE_SIZE,
      fecha: filterDate,
      estado: filterStatus,
      especialidad_id: filterEspecialidad,
      paciente_q: query,
    };

    // Limpiamos los parámetros que estén vacíos para no enviarlos a la API
    Object.keys(paramsToApply).forEach((key) => {
      if (!paramsToApply[key]) {
        delete paramsToApply[key];
      }
    });

    setParams(paramsToApply);
  };

  // Limpia los filtros y vuelve a la primera página
  const resetFilters = () => {
    setFilterDate("");
    setFilterStatus("");
    setFilterEspecialidad("");
    setQuery("");
    setParams({ page: 1, page_size: PAGE_SIZE });
  };

  // Función para abrir el modal con la cita seleccionada
  const handleShowModal = (cita) => {
    setSelectedCita(cita);
    setShowCitaModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowCitaModal(false);
    setSelectedCita(null);
  };

  // Formatear fecha para que sea más legible
  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen font-['Outfit'] bg-[#f5f5f5] pt-26 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Citas Médicas</h1>

          {/* Panel de Filtros */}
          <div className="bg-white rounded-2xl shadow p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  className="w-full border rounded p-2 text-sm"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  className="w-full border rounded p-2 text-sm bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Todos</option>
                  {/* Opciones de estado cargadas dinámicamente */}
                  {dataEstadosCitas?.results?.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Especialidad
                </label>
                <select
                  className="w-full border rounded p-2 text-sm bg-white"
                  value={filterEspecialidad}
                  onChange={(e) => setFilterEspecialidad(e.target.value)}
                >
                  <option value="">Todos</option>
                  {/* Opciones de estado cargadas dinámicamente */}
                  {especialidades?.results?.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="xl:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buscar Paciente
                </label>
                <input
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Nombre, DNI o email del paciente"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border rounded text-sm font-medium"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => applyFiltersAndFetch(1)}
                  className="px-4 py-2 bg-[#263248] text-white rounded text-sm font-medium"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Resultados */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="font-semibold p-3">Fecha y Hora</th>
                    <th className="font-semibold p-3">Paciente</th>
                    <th className="font-semibold p-3">Motivo</th>
                    <th className="font-semibold p-3">Estado</th>
                    <th className="font-semibold p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-gray-500"
                      >
                        Cargando citas...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-red-500">
                        Error al cargar las citas. Intenta de nuevo.
                      </td>
                    </tr>
                  ) : citas.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-gray-500"
                      >
                        No se encontraron citas con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    citas.map((cita) => (
                      <tr key={cita.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          {formatDateTime(cita.fecha_hora_establecida)}
                        </td>
                        <td className="p-3">
                          {cita.paciente?.usuario?.nombre_completo || "N/A"}
                          <div className="text-xs text-gray-400">
                            {cita.paciente?.usuario?.email || ""}
                          </div>
                        </td>
                        <td className="p-3">{cita.motivo || "-"}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {cita.estado?.nombre || "N/A"}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleShowModal(cita)}
                            className="px-3 py-1 border rounded text-xs font-medium hover:bg-gray-100"
                          >
                            Ver Detalles
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-600">
                {pagination.count > 0
                  ? `Mostrando ${
                      (pagination.current_page - 1) * pagination.page_size + 1
                    }–${Math.min(
                      pagination.current_page * pagination.page_size,
                      pagination.count
                    )} de ${pagination.count} resultados`
                  : "No hay resultados"}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={loading || !pagination.previous}
                  onClick={() =>
                    applyFiltersAndFetch(pagination.current_page - 1)
                  }
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <div className="px-3 py-1 border rounded text-gray-700">
                  Página {pagination.current_page} de {pagination.total_pages}
                </div>
                <button
                  disabled={loading || !pagination.next}
                  onClick={() =>
                    applyFiltersAndFetch(pagination.current_page + 1)
                  }
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          {selectedCita && (
            <ShowCitaModal
              cita={selectedCita}
              open={showCitaModal}
              onClose={handleCloseModal}
              onLoadEstadoCita={getAllEstadoCitas}
              estadoCita={dataEstadosCitas?.results ?? null}
              onChangeAtendido={pathAtendidoCita}
              onChangeAtendiendo={pathAtendiendoCita}
            />
          )}
        </div>
      </div>
    </>
  );
}
