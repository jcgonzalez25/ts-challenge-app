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
  createdAt: Date;
  updatedAt: Date;
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

export interface UpdateStudentDto extends Partial<CreateStudentDto> {
  id: number;
}

export interface StudentFilters {
  search?: string;
  graduationYear?: number;
  minGpa?: number;
  maxGpa?: number;
  city?: string;
  state?: string;
}
