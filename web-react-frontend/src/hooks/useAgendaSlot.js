import { useState, useEffect, useCallback } from "react";
import { getPublicAgendaSlot } from "../api/agendaApi";

export default function getAgendaSlot({
  autoFetch = true,
  agenda_id
} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async (params = {}) => {
    const id = params.agenda_id ?? agenda_id;
    if (!id ) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicAgendaSlot(id);
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
