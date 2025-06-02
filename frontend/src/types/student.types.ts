export interface Student {
  id: number;
  name: string;
  email: string;
  graduationYear: number;
  phoneNumber: string;
  gpa: number;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateStudentDto {
  name: string;
  email: string;
  graduationYear: number;
  phoneNumber: string;
  gpa: number;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
}

// For now, keeping the simple version
export interface StudentBasic {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}