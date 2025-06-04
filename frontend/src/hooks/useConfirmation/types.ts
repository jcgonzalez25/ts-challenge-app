export interface UseConfirmationOptions {
  message?: string;
  title?: string;
}

export interface ConfirmationOperations {
  confirm: (action: () => Promise<void> | void, options?: UseConfirmationOptions) => Promise<void>;
} 