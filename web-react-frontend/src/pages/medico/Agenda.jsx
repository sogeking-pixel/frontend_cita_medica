import React, { useEffect, useMemo, useState } from "react";
import Header from "../../layouts/HeaderMedico";

import CalendarPanel  from "../../components/CalendarPanel";
import AgendaList  from "../../components/AgendaList";
import CitaLists from "../../components/CitaLists";
import  CreateAgendaModal from "../../components/medico/CreateAgendaModal";
import { useAuth } from "../../hooks/useAuth";
import useGetMedicoEspecialidades from "../../hooks/medico/useMedicoEspecialidad";
import useCreateAgenda from "../../hooks/medico/useCreateAgenda";
import useGetMedicoEspecialidad from "../../hooks/medico/useGetMedicoEspecialidad";
import useGetMedicoAgenda from "../../hooks/medico/useGetMedicoAgenda";
import useGetAgendaCitas from "../../hooks/medico/useAgendaCitas";


export default function Agenda() {
  const { user } = useAuth();

  // Hook para traer las especialidades del backend
  const {
    data: especialidades = [],
    loading: loadingEsp,
    error: especialidadesError,
    refetch: refetchEspecialidades,
  } = useGetMedicoEspecialidades();

  const { postCreateAgenda } = useCreateAgenda();
  const { getIdMedicoEspecialidad } = useGetMedicoEspecialidad();
  const { getMedicoAgenda } = useGetMedicoAgenda();
  const { agendaCitas } = useGetAgendaCitas();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAgendas, setSelectedAgendas] = useState({});
  const [selectAgenda, setSelectedAgenda] = useState({})
  
  const weekdays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];


  return (
    <>
      <Header />
      <div className="w-full min-h-screen font-['Outfit'] bg-[#f5f5f5] pt-26 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold my-8">Agenda médico</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendario (izquierda) */}
            <CalendarPanel
              onSelectAgendas={setSelectedAgendas}
              getMedicoAgenda={getMedicoAgenda}
              button={
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-5 py-2 bg-[#62b1b1] text-white rounded"
                >
                  Nueva disponibilidad
                </button>
              }
            />

            {/* Right column: Agendas creadas + Detalle del día (incluye citas) */}
            <div className="flex flex-col gap-6">
              {/* Agendas creadas: lista de reglas/publicadas */}
              <AgendaList
                date={selectedAgendas.date ?? null}
                agendas={selectedAgendas.allAgendas ?? []}
                onDelete={() => {}}
                onView={setSelectedAgenda}
              />

              {/* Detalle del día seleccionado + resumen y citas */}
              <CitaLists
                agenda={selectAgenda}
                citas={[]}
                loadCita={agendaCitas}
                showCita={() => {}}
              />
            </div>
          </div>

          {/* Create modal */}
          <CreateAgendaModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={postCreateAgenda}
            onSearchMedicoEspecialidad={getIdMedicoEspecialidad}
            especialidadOptions={especialidades}
            loadingEsp={loadingEsp}
            especialidadesError={especialidadesError}
            weekdays={weekdays}
          />
        </div>
      </div>
    </>
  );
}
