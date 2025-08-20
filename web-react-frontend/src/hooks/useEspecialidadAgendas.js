import { useState, useEffect, useCallback } from "react";
import { getPublicEspecialidadAgenda } from "../api/doctorApi";

export default function getEspecialidadAgenda(autoFetch = true, especialidad_id) {
  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(Boolean(autoFetch));
    const [error, setError] = useState(null);
  
    const fetch = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getPublicEspecialidadAgenda(especialidad_id);
        setData(res?.data ?? null);
        return res?.data ?? null; 
      }catch (err) {
        setError(err);
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      if (autoFetch) fetch().catch(() => {});
    }, [autoFetch, fetch]);
  
    return { data, loading, error, refetch: fetch };
}
