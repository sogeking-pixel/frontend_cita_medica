import { useState, useCallback } from "react";
import { postConfirmPaciente } from "../api/pacienteApi";

export default function useConfirmPaciente() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmPaciente = useCallback(async (token) => {
    if (!token) return null;
    setLoading(true);
    setError(null);
    try {
      const playload = {
        token,
      };
      const res = await postConfirmPaciente(playload);
      setData(res?.data ?? null);
    } catch (err) {
      
      setError(err);
      setData(null);
      throw err;

    } finally {
      setLoading(false);
    }
  }, []);

  return { data, confirmPaciente, loading, error };
}
