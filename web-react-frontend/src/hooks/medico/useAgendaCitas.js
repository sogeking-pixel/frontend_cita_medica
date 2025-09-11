import { useState, useCallback } from "react";
import { getAgendaCitas } from "../../api/agendaApi";

export default function useGetAgendaCitas() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const agendaCitas = useCallback(async (id_agenda) => {
      
    if (!id_agenda){
        setError(
            new Error("Se necesita el rango de fecha :/" )
      );
        return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getAgendaCitas(id_agenda);
      const citasDatas = res?.data ?? null;
      setData(citasDatas);
      return citasDatas;
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, agendaCitas, loading, error };
}