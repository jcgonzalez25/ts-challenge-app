export interface EditingStateOperations<T> {
  editingItem: T | null;
  isEditing: boolean;
  startEditing: (item: T) => void;
  stopEditing: () => void;
} 