import { useState, useEffect, useCallback } from "react";
import { getMedicoEspecialidades } from "../../api/doctorApi";

export default function useGetMedicoEspecialidades(autoFetch = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMedicoEspecialidades();
      setData(res.data);
      return res.data; 
      setError(err);
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
