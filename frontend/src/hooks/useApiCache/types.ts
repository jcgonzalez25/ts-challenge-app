export interface CacheConfig {
  autoInvalidateOnMutation?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number; // milliseconds
}

export interface ApiCacheOperations {
  refetch: () => Promise<void>;
  invalidate: () => void;
  markStale: () => void;
  isStale: () => boolean;
}

export interface UseApiCacheConfig {
  fetchData: () => Promise<void>;
  config?: CacheConfig;
} 