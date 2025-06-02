import { useState, useCallback } from 'react';

export const useEditingState = <T>() => {
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const startEditing = useCallback((item: T) => {
    setEditingItem(item);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingItem(null);
  }, []);

  const isEditing = editingItem !== null;

  return {
    editingItem,
    isEditing,
    startEditing,
    stopEditing,
  };
}; 