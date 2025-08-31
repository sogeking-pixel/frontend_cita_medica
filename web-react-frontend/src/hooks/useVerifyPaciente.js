import { useState, useCallback } from "react";
import { getPublicPaciente } from "../api/pacienteApi";

export default function useVerifyPaciente() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyPaciente = useCallback(async (email) => {
    if (!email) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await getPublicPaciente({"email": email});
      setData(res?.data ?? null);
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  },[]);

  return { data, verifyPaciente, loading, error };
}
