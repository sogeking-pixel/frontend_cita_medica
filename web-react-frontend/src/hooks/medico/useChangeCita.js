import { useState, useCallback } from "react";
import { updateCita } from "../../api/citaApi";

export function useChangeCitaToAtendiendo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pathAtendiendoCita = useCallback(async (id,payload) => {
      if (
        !id ||
        !payload ||
        !payload.estado ||
        !payload.fecha_hora_atendida
      ) {
        setError(
          new Error(
            "Se requiere id or playload correcto :/"
          )
        );
        return null;
      }
    setLoading(true);
    setError(null);
    try {
      const res = await updateCita(id, payload);
      const dataRes = res?.data ?? null;
      setData(dataRes);
      return dataRes; 
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  },[]);

  return { data, pathAtendiendoCita, loading, error };
}

export function useChangeCitaToAtendido() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pathAtendidoCita = useCallback(async (id, payload) => {
    if (
      !id ||
      !payload ||
      !payload.estado ||
      !payload.fecha_hora_terminada ||
      !payload.diagnostico
    ) {
      setError(new Error("Se requiere id or playload correcto :/"));
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await updateCita(id, payload);
      const dataRes = res?.data ?? null;
      setData(dataRes);
      return dataRes;
    } catch (err) {
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, pathAtendidoCita, loading, error };
}