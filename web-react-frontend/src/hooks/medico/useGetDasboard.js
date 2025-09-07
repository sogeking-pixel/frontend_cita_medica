import { useState, useEffect, useCallback } from "react";
import { getPrivateMedicoDashboard } from "../../api/doctorApi";

export default function useGetDasboard(autoFetch = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPrivateMedicoDashboard();
      setData(res.data);
      return res.data;
    }
    catch (err) {
      setError(err);
      throw err;
    }    
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) fetch().catch(() => {});
  }, [autoFetch, fetch]);

  return { data, loading, error, refetch: fetch };
}
