import { useState, useCallback } from "react";
import { getPublicMedicoEspecialidad } from "../../api/medicoEspecialidadApi";

export default function useGetMedicoEspecialidad() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIdMedicoEspecialidad = useCallback(async (medico_id, especialidad_id) => {
    if (
      !medico_id ||
      !especialidad_id
    ) {
      setError(
        new Error("Falta valores necesarios :/")
      );
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicMedicoEspecialidad(medico_id, especialidad_id);
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

  return { data, getIdMedicoEspecialidad, loading, error };
}