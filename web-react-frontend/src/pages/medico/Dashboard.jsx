import React, { useEffect, useState } from "react";
import Header from "../../layouts/HeaderMedico";
import StatCard from "../../components/medico/StatCard";
import Table from "../../components/medico/table";
import AlertMessage from "../../components/AlertMessage";
import CardBienvenida from "../../components/medico/CardBienvenida";
import useGetDasboard  from "../../hooks/medico/useGetDasboard";
import useGetMedicoEspecialidades from "../../hooks/medico/useMedicoEspecialidad";
import {
  FiUserPlus,
  FiCalendar,
  FiCheckSquare,
  FiClock,
  FiUserCheck,
  FiAlertCircle,
} from "react-icons/fi";

export default function Dashboard() {
  //todo arreglar dashboard fallo hook.js:608 Dashboard fetch falló, usando datos de ejemplo: AbortError: signal is aborted without reason
  const {
    data: dashboard,
    loading: loadingD,
    error: errD,
    refetch: refetchDashboard,
  } = useGetDasboard();
  const {
    data: especialidades,
    loading: loadingE,
    error: errE,
    refetch: refetchEspecialidades,
  } = useGetMedicoEspecialidades();
  const [selectedEspecialidad, setSelectedEspecialidad] = useState("");

  const columns = [
    { title: "Fecha", accessor: "date" },
    { title: "Hora", accessor: "time", className: "font-medium" },
    {
      title: "Paciente",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiUserCheck className="text-gray-400" />
          <span>{row.patient}</span>
        </div>
      ),
    },
    { title: "Motivo", accessor: "reason" },
    {
      title: "Acciones",
      render: (row) => (
        <td className="text-center">
          <button className="font-medium text-blue-600 hover:underline">
            Ver Ficha
          </button>
        </td>
      ),
    },
  ];
  
  // helpers para valores seguros (evitan crash si dashboard es undefined)
  const stats = dashboard?.estadisticas_generales ?? {};
  const citasHoy = stats.citas_hoy ?? 0;
  const citasCompletadasHoy = stats.citas_completadas_hoy ?? 0;
  const nuevosPacientesMes = stats.nuevos_pacientes_mes ?? 0;
  const citasPendientesHoy = stats.citas_pendientes_hoy ?? 0;

  // datos tabulares (fallback a array vacío)
  const proximasCitas = dashboard?.serie_citas_7dias ?? [];

  return (
    <>
      <Header />
      <div className="w-full min-h-screen font-['Outfit'] bg-[#f5f5f5]">
        <div className="pt-30 pb-20 px-8 sm:px-20 lg:px-52 2xl:px-64 space-y-6">
          {loadingD && (
            <div className="text-center py-6">
              Cargando datos del dashboard...
            </div>
          )}

          {!loadingD && errD && (
            <AlertMessage title={"Error"} type={"warning"}>
              Error en cargar la información ;(,{" "}
              <button onClick={refetchDashboard} className="underline">
                Recargar
              </button>
            </AlertMessage>
          )}

          <CardBienvenida nombres={"Sanchez Yerson"} />

          <div className="my-8 flex items-center gap-5">
            <label htmlFor="select-especialidad" className="text-gray-600">
              Ver por especialidad:
            </label>

            <select
              id="select-especialidad"
              value={selectedEspecialidad}
              onChange={(e) => setSelectedEspecialidad(e.target.value)}
              className="rounded-md border px-3 py-1 bg-white"
              disabled={loadingE}
            >
              <option value="">Todas</option>
              {(especialidades?.results || []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre || "no hay nada"}
                </option>
              ))}
            </select>

            {loadingE && (
              <span className="text-sm text-gray-500">
                Cargando especialidades...
              </span>
            )}

            {errE && (
              <AlertMessage title="Error" type="warning">
                No se pudieron cargar las especialidades.{" "}
                <button onClick={refetchEspecialidades} className="underline">
                  Reintentar
                </button>
              </AlertMessage>
            )}

            {selectedEspecialidad && (
              <span className="ml-2 inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
                Mostrando:{" "}
                {especialidades.find((e) => e.id === selectedEspecialidad)
                  ?.nombre || "Seleccionada"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              icon={<FiCalendar size={24} className="text-blue-500" />}
              title="Citas de Hoy"
              value={citasHoy}
              color="text-blue-500"
            />

            <StatCard
              icon={<FiCheckSquare size={24} className="text-green-500" />}
              title="Citas Completadas (Hoy)"
              value={citasCompletadasHoy}
              color="text-green-500"
            />

            <StatCard
              icon={<FiUserPlus size={24} className="text-indigo-500" />}
              title="Nuevos Pacientes (Mes)"
              value={nuevosPacientesMes}
              color="text-indigo-500"
            />

            <StatCard
              icon={<FiClock size={24} className="text-yellow-500" />}
              title="Citas Pendientes (Hoy)"
              value={citasPendientesHoy}
              color="text-yellow-500"
            />
          </div>

          <Table
            title="Próximas Citas"
            columns={columns}
            data={proximasCitas}
            keyField="id"
            emptyMessage="No hay citas próximas."
          />
        </div>
      </div>
    </>
  );
}
