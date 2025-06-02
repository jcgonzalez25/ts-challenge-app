import { useCallback } from 'react';

interface UseConfirmationOptions {
  message?: string;
  title?: string;
}

export const useConfirmation = () => {
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
}; 