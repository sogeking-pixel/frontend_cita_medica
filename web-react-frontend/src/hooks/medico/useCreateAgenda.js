import { useState, useCallback } from "react";
import { createMedicoAgenda } from "../../api/doctorApi";

export default function useCreateAgenda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postCreateAgenda = useCallback(async (payload) => {
    if (
      !payload ||
      !payload.hora_inicio ||
      !payload.hora_fin ||
      !payload.time_slot_minutes ||
      !payload.medico_especialidad
    ) {
      setError(
        new Error("El payload es inválido. Se requiere medicoId, fecha y hora.")
      );
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await createMedicoAgenda(payload);
      const agendaData = res?.data ?? null;
      setData(agendaData);
      return agendaData; 
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  },[]);

  return { data, postCreateAgenda, loading, error };
}