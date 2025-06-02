import { useCallback, useRef, useEffect } from 'react';
import { UseApiCacheConfig, ApiCacheOperations } from './types';

export function useApiCache(config: UseApiCacheConfig): ApiCacheOperations {
  const { fetchData, config: cacheConfig = {} } = config;
  const {
    refetchOnWindowFocus = false,
    staleTime = 5 * 60 * 1000, // 5 minutes default
  } = cacheConfig;

  const lastFetchTime = useRef<number>(0);
  const isStaleRef = useRef<boolean>(true);

  const isStale = useCallback(() => {
    const now = Date.now();
    return isStaleRef.current || (now - lastFetchTime.current) > staleTime;
  }, [staleTime]);

  const refetch = useCallback(async () => {
    await fetchData();
    lastFetchTime.current = Date.now();
    isStaleRef.current = false;
  }, [fetchData]);

  const invalidate = useCallback(() => {
    isStaleRef.current = true;
  }, []);

  const markStale = useCallback(() => {
    isStaleRef.current = true;
  }, []);

  // Refetch on window focus if enabled
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (isStale()) {
        refetch();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, isStale, refetch]);

  return {
    refetch,
    invalidate,
    markStale,
    isStale,
  };
} 