import { useCallback } from 'react';
import { UseConfirmationOptions, ConfirmationOperations } from './types';

export function useConfirmation(): ConfirmationOperations {
  const confirm = useCallback(async (
    action: () => Promise<void> | void,
    options: UseConfirmationOptions = {}
  ) => {
    const { message = 'Are you sure?' } = options;
    
    const confirmed = window.confirm(message);
    if (confirmed) {
      await action();
    }
  }, []);

  return { confirm };
} 