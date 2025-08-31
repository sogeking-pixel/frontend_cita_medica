import { useState, useCallback } from "react";
import { getPublicAgenda } from "../api/agendaApi";

export default function useGetAgenda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAgenda = useCallback(async (id) => {
    if (!id) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicAgenda(id);
      setData(res?.data ?? null);
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  },[]);

  return { data, getAgenda, loading, error };
}
