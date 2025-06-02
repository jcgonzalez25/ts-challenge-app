import apiClient from './apiClient';
import { Student, CreateStudentDto } from '../../types/student.types';

export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const response = await apiClient.get<Student[]>('/api/students');
    return response.data;
  },

  getById: async (id: number): Promise<Student> => {
    const response = await apiClient.get<Student>(`/api/students/${id}`);
    return response.data;
  },

  create: async (data: CreateStudentDto): Promise<Student> => {
    const response = await apiClient.post<Student>('/api/students', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateStudentDto>): Promise<Student> => {
    const response = await apiClient.put<Student>(`/api/students/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/students/${id}`);
  },
};