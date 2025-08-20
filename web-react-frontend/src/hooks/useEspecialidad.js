import { useState, useEffect, useCallback } from "react";
import { getPublicEspecialidades } from "../api/especialidadApi";

export default function useGetEspecialidades(autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicEspecialidades();
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
