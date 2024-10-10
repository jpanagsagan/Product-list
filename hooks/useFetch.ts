// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

type FetchData<T> = {
  data: T | null;
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const useFetch = <T>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result: any = await response.json();
        console.log(result.products);
        setData(result.products);
        setTotalPages(result.total);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, totalPages, loading, error };
};

export default useFetch;
