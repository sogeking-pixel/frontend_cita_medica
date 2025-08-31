import { useState, useEffect, useCallback } from "react";
import { getPublicEspecialidadAgenda } from "../api/especialidadApi";

export default function getEspecialidadAgenda({
  autoFetch = true,
  especialidad_id,
  dia,
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async (params = {}) => {
    const id = params.especialidad_id ?? especialidad_id;
    const d = params.dia ?? dia;
    if (!id || !d) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicEspecialidadAgenda(id, d);
      setData(res?.data ?? null);
      return res?.data ?? null;
    } catch (err) {
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
