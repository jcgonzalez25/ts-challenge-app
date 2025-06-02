import { useCallback } from 'react';
import { CreateStudentDto } from '../../types/student.types';
import { studentApi } from '../../services/api/studentApi';
import { StudentsApiConfig, StudentsApiOperations } from './types';
import { useAsyncOperation } from '../useAsyncOperation';
import { useApiCache } from '../useApiCache';

export function useStudentsApi(config: StudentsApiConfig): StudentsApiOperations {
  const { setStudents, setLoading, setError, onError } = config;

  // Generic async operation handler
  const { execute } = useAsyncOperation({
    setLoading,
    setError,
    onError,
  });

  // Fetch students function
  const fetchStudents = useCallback(async () => {
    await execute(
      () => studentApi.getAll(),
      {
        errorMessage: 'Failed to fetch students',
        onSuccess: () => {
          // Data is handled in the execute callback via setStudents
        }
      }
    ).then((data) => {
      if (data) {
        setStudents(data);
      }
    });
  }, [execute, setStudents]);

  // Cache management
  const { refetch } = useApiCache({
    fetchData: fetchStudents,
    config: {
      autoInvalidateOnMutation: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  });

  // CRUD operations
  const createStudent = useCallback(async (data: CreateStudentDto) => {
    await execute(
      () => studentApi.create(data),
      {
        errorMessage: 'Failed to create student',
        onSuccess: () => refetch(),
      }
    );
  }, [execute, refetch]);

  const updateStudent = useCallback(async (id: number, data: Partial<CreateStudentDto>) => {
    await execute(
      () => studentApi.update(id, data),
      {
        errorMessage: 'Failed to update student',
        onSuccess: () => refetch(),
      }
    );
  }, [execute, refetch]);

  const deleteStudent = useCallback(async (id: number) => {
    await execute(
      () => studentApi.delete(id),
      {
        errorMessage: 'Failed to delete student',
        onSuccess: () => refetch(),
      }
    );
  }, [execute, refetch]);

  return {
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
} 