import { useCallback } from 'react';
import { 
  UseAsyncOperationConfig, 
  AsyncOperationReturn, 
  AsyncOperationConfig 
} from './types';

export function useAsyncOperation(config: UseAsyncOperationConfig): AsyncOperationReturn {
  const { setLoading, setError, onError } = config;

  const execute = useCallback(async <T>(
    operation: () => Promise<T>,
    operationConfig: AsyncOperationConfig = {}
  ): Promise<T | undefined> => {
    const { 
      onError: operationOnError, 
      onSuccess, 
      errorMessage = 'Operation failed' 
    } = operationConfig;

    try {
      setLoading(true);
      setError(null);
      
      const result = await operation();
      
      onSuccess?.();
      return result;
    } catch (err) {
      const finalErrorMessage = errorMessage;
      setError(finalErrorMessage);
      onError?.(finalErrorMessage);
      operationOnError?.(finalErrorMessage);
      console.error('Async operation error:', err);
      throw err; // Re-throw for component error handling
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, onError]);

  const executeWithoutThrow = useCallback(async <T>(
    operation: () => Promise<T>,
    operationConfig: AsyncOperationConfig = {}
  ): Promise<T | undefined> => {
    try {
      return await execute(operation, operationConfig);
    } catch (err) {
      // Error already handled in execute, just return undefined
      return undefined;
    }
  }, [execute]);

  return {
    execute,
    executeWithoutThrow,
  };
} 