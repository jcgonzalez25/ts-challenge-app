import apiClient from './apiClient';
import { Student, CreateStudentDto } from '../../types/student.types';
import { ApiResponse } from '../../types/api.types';

export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const response = await apiClient.get<ApiResponse<Student[]>>('/api/students');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Student> => {
    const response = await apiClient.get<ApiResponse<Student>>(`/api/students/${id}`);
    if (!response.data.data) {
      throw new Error(response.data.error || 'Student not found');
    }
    return response.data.data;
  },

  create: async (data: CreateStudentDto): Promise<Student> => {
    const response = await apiClient.post<ApiResponse<Student>>('/api/students', data);
    if (!response.data.data) {
      throw new Error(response.data.error || 'Failed to create student');
    }
    return response.data.data;
  },

  update: async (id: number, data: Partial<CreateStudentDto>): Promise<Student> => {
    const response = await apiClient.put<ApiResponse<Student>>(`/api/students/${id}`, data);
    if (!response.data.data) {
      throw new Error(response.data.error || 'Failed to update student');
    }
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/api/students/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete student');
    }
  },
};