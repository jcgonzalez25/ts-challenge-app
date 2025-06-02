import { useCallback } from 'react';
import { CreateStudentDto, Student } from '../../types/student.types';
import { useEditingState } from '../useEditingState';

interface UseStudentEditorProps {
  onUpdate: (id: number, data: Partial<CreateStudentDto>) => Promise<void>;
  onCreate: (data: CreateStudentDto) => Promise<void>;
}

export const useStudentEditor = ({ onUpdate, onCreate }: UseStudentEditorProps) => {
  const { editingItem, isEditing, startEditing, stopEditing } = useEditingState<Student>();

  const handleSubmit = useCallback(async (data: CreateStudentDto) => {
    if (editingItem) {
      await onUpdate(editingItem.id, data);
      stopEditing();
    } else {
      await onCreate(data);
    }
  }, [editingItem, onUpdate, onCreate, stopEditing]);

  return {
    editingStudent: editingItem,
    isEditing,
    startEditing,
    stopEditing,
    handleSubmit,
  };
}; 