export interface AsyncOperationState {
  loading: boolean;
  error: string | null;
}

export interface AsyncOperationConfig {
  onError?: (error: string) => void;
  onSuccess?: () => void;
  errorMessage?: string;
}

export interface UseAsyncOperationConfig {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onError?: (error: string) => void;
}

export interface AsyncOperationReturn {
  execute: <T>(
    operation: () => Promise<T>,
    config?: AsyncOperationConfig
  ) => Promise<T | undefined>;
  executeWithoutThrow: <T>(
    operation: () => Promise<T>,
    config?: AsyncOperationConfig
  ) => Promise<T | undefined>;
} 