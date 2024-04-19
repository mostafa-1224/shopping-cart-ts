import { useState, useEffect } from 'react';

interface ApiHookResponse<T> {
  data?: T;
  isLoading: boolean;
  error: string | null;
}

const useApiHook = <T>(url: string): ApiHookResponse<T> => {

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
        setError(null);
      } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
          setError(error.message || errorMessage);
        }else {
          setError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  return { data, isLoading, error };
};

export default useApiHook;