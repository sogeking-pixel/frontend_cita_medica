export default function AgendaList({ date, agendas, onShareAgenda, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5  flex-1">
      <div>
        <h2 className="text-lg font-medium mb-3">
          Agendas creadas
          {date && (
            <>
              {" "}
              en{" "}
              <span>
                {new Date(date).toLocaleDateString({
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>{" "}
            </>
          )}
        </h2>
      </div>

      {agendas.length === 0 ? (
        <p className="text-sm text-gray-500">
          Selecione un evento en el calendario para observar las agendas :/
        </p>
      ) : (
        <ul className="space-y-4 overflow-auto my-2">
          {agendas.map((s) => (
            <li
              key={s.id}
              className="p-3 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-sm">
                  {s.especialidad.nombre ?? ""}
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(`1970-01-01T${s.hora_inicio}`).toLocaleTimeString({
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(`1970-01-01T${s.hora_fin}`).toLocaleTimeString({
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  | {s.time_slot_minutes} min
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShareAgenda(s)}
                  className="px-2 py-1 border rounded text-xs"
                >
                  Compartir
                </button>
                <button
                  onClick={() => onView(s)}
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
  );
}
