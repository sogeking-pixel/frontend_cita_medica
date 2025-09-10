import { useState, useCallback } from "react";
import { getMedicoAgendas } from "../../api/doctorApi";

export default function useGetMedicoAgenda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const getMedicoAgenda = useCallback(async (date_gte, date_lte) => {
      
    if (!date_gte || !date_lte){
        setError(
            new Error("Se necesita el rango de fecha :/" )
      );
      console.log('pene')
        return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getMedicoAgendas(date_gte, date_lte);
      const agendaData = res?.data ?? null;
      setData(agendaData);
      return agendaData;
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, getMedicoAgenda, loading, error };
}