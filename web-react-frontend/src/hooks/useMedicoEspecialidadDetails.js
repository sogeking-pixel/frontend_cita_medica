import { useState, useCallback } from "react";
import { getPublicMedicoEspecialidadDetails } from "../api/medicoEspecialidadApi";

export default function useGetMedicoEspecialidadDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMedicoEspecialidad = useCallback(async (id) => {
      if (!id) return null;
      setLoading(true);
      setError(null);
      try {
        const res = await getPublicMedicoEspecialidadDetails(id);
        setData(res?.data ?? null);
      } catch (err) {
        setError(err);
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },[])

  return { data, getMedicoEspecialidad, loading, error };
}