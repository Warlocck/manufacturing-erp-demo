/**
 * Hook personalizado para consumir API REST
 * Maneja estados de carga, error y datos
 */

import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiOptions {
  skip?: boolean;
  retryCount?: number;
}

export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> {
  const { skip = false, retryCount = 3 } = options;
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async (attempt = 0) => {
    if (skip) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      
      if (attempt < retryCount) {
        // Retry con backoff exponencial
        setTimeout(() => fetchData(attempt + 1), Math.pow(2, attempt) * 1000);
      } else {
        setState({ data: null, loading: false, error });
      }
    }
  }, [url, skip, retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

/**
 * Hook para POST/PUT/DELETE
 */
export function useMutation<T, R>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  const [state, setState] = useState<UseApiState<R>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (payload?: T) => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido');
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [url, method]
  );

  return { ...state, mutate };
}
