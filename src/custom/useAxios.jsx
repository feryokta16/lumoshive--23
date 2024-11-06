import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url, method = "GET", body = null, headers = {}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios({ method, url, data: body, headers });
        setResponse(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, method, body, headers]);
  return { response, loading, error };
};

export default useAxios;
