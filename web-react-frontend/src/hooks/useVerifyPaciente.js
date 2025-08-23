import { useState, useEffect, useCallback } from "react";
import { getPublicPaciente } from "../api/pacienteApi";

export default function useVerifyPaciente({
  autoFetch = true,
  email
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async (params = {}) => {
    const email = params.email ?? email;
    if (!email) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicPaciente({"email": email});
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
