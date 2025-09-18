import { useState, useCallback } from "react";
import { getEstadoCitas } from "../api/citaApi";

export default function useEstadoCita() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllEstadoCitas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEstadoCitas();
      const estadoData = res?.data ?? null;
      setData(estadoData);
      return estadoData; 
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
    
  return { data, getAllEstadoCitas, loading, error };
}
