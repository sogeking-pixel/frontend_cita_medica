// src/hooks/useNewUserCita.js
import { useState, useCallback } from "react";
import { postPublicPacienteCitaSinRegistrar } from "../api/pacienteApi";

export default function useNewUserCita() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearCita = useCallback( async (payload) => {
      if (!payload) return null;
      setLoading(true);
      setError(null);
      try {
        const res = await postPublicPacienteCitaSinRegistrar(payload);
        setData(res?.data ?? null);
      } catch (err) {
        setError(err);
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },[])

  return { data, crearCita, loading, error };
}
