import { useState, useEffect, useCallback } from 'react';
import { Student, CreateStudentDto } from '../types/student.types';
import { studentApi } from '../services/api/studentApi';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentApi.getAll();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = useCallback(async (data: CreateStudentDto) => {
    try {
      setLoading(true);
      setError(null);
      await studentApi.create(data);
      await fetchStudents(); 
    } catch (err) {
      setError('Failed to create student');
      console.error('Error creating student:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStudents]);

  const updateStudent = useCallback(async (id: number, data: Partial<CreateStudentDto>) => {
    try {
      setLoading(true);
      setError(null);
      await studentApi.update(id, data);
      await fetchStudents();
    } catch (err) {
      setError('Failed to update student');
      console.error('Error updating student:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStudents]);

  const deleteStudent = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await studentApi.delete(id);
      await fetchStudents();
    } catch (err) {
      setError('Failed to delete student');
      console.error('Error deleting student:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents,
  };
};