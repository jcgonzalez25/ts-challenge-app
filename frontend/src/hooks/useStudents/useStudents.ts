import { useEffect } from 'react';
import { UseStudentsConfig, UseStudentsReturn } from './types';
import { useStudentsState } from './useStudentsState';
import { useStudentsApi } from './useStudentsApi';

export function useStudents(config: UseStudentsConfig = {}): UseStudentsReturn {
  const { autoFetch = true, onError } = config;

  // State management
  const {
    students,
    loading,
    error,
    setStudents,
    setLoading,
    setError,
  } = useStudentsState();

  // API operations
  const {
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudentsApi({
    setStudents,
    setLoading,
    setError,
    onError,
  });

  // Auto-fetch on mount (configurable)
  useEffect(() => {
    if (autoFetch) {
      fetchStudents();
    }
  }, [autoFetch, fetchStudents]);

  return {
    // State
    students,
    loading,
    error,
    
    // API Operations
    createStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
    
    // Convenience methods
    refetch: fetchStudents,
  };
}