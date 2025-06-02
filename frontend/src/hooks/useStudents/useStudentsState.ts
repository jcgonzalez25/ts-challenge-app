import { useState, useCallback } from 'react';
import { Student } from '../../types/student.types';
import { StudentsState, StudentsStateActions } from './types';

export function useStudentsState(): StudentsState & StudentsStateActions {
  const [students, setStudentsInternal] = useState<Student[]>([]);
  const [loading, setLoadingInternal] = useState(false);
  const [error, setErrorInternal] = useState<string | null>(null);

  const setStudents = useCallback((newStudents: Student[]) => {
    setStudentsInternal(newStudents);
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setLoadingInternal(isLoading);
  }, []);

  const setError = useCallback((errorMessage: string | null) => {
    setErrorInternal(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setErrorInternal(null);
  }, []);

  return {
    // State
    students,
    loading,
    error,
    
    // Actions
    setStudents,
    setLoading,
    setError,
    clearError,
  };
} 