import { Student, CreateStudentDto } from '../../types/student.types';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export interface StudentsStateActions {
  setStudents: (students: Student[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface StudentsApiOperations {
  createStudent: (data: CreateStudentDto) => Promise<void>;
  updateStudent: (id: number, data: Partial<CreateStudentDto>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  fetchStudents: () => Promise<void>;
}

export interface UseStudentsConfig {
  autoFetch?: boolean;
  onError?: (error: string) => void;
}

export interface UseStudentsReturn extends StudentsState, StudentsApiOperations {
  refetch: () => Promise<void>;
}

export interface StudentsApiConfig {
  setStudents: (students: Student[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onError?: (error: string) => void;
} 