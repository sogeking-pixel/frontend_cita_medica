import { useState, useEffect, useCallback } from "react";
import { getMedicoCitas } from "../../api/doctorApi";

export const useMedicoCitas = (initialParams = {}) => {

  const [citas, setCitas] = useState([]);


  const [pagination, setPagination] = useState({
    count: 1,
    next: "",
    previous: "",
    current_page: 1,
    total_pages: 1,
    page_size: 10,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [params, setParams] = useState(initialParams);


  const fetchCitas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMedicoCitas(params);

      setCitas(response.data.results);      
      const axu = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        current_page: response.data.current_page,
        total_pages: response.data.total_pages,
        page_size: response.data.page_size,
      };
      setPagination(axu);
    } catch (err) {
      console.error("Error al obtener las citas:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]); 

  useEffect(() => {
    fetchCitas();
  }, [fetchCitas]);


  return {
    citas,
    pagination,
    loading,
    error,
    setParams,
    fetchCitas,
  };
};
