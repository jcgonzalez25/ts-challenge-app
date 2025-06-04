import { StudentModel } from '../models/student.model';
import { CreateStudentDto, UpdateStudentDto, Student, StudentFilters } from '../types/student.types';
import { formatPhoneNumber } from '../utils/validators';

export class StudentService {
  static async getAllStudents(filters?: StudentFilters): Promise<Student[]> {
    return StudentModel.findAll(filters);
  }

  static async getStudentById(id: number): Promise<Student> {
    const student = await StudentModel.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  static async createStudent(data: CreateStudentDto): Promise<Student> {
    // Check if email already exists
    const existingStudent = await StudentModel.findByEmail(data.email);
    if (existingStudent) {
      throw new Error('A student with this email already exists');
    }

    // Format phone number
    const formattedData = {
      ...data,
      phoneNumber: formatPhoneNumber(data.phoneNumber)
    };

    return StudentModel.create(formattedData);
  }

  static async updateStudent(id: number, data: UpdateStudentDto): Promise<Student> {
    // Check if student exists
    const existingStudent = await StudentModel.findById(id);
    if (!existingStudent) {
      throw new Error('Student not found');
    }

    // Check email uniqueness if email is being updated
    if (data.email && data.email !== existingStudent.email) {
      const studentWithEmail = await StudentModel.findByEmail(data.email);
      if (studentWithEmail) {
        throw new Error('A student with this email already exists');
      }
    }

    // Format phone number if provided
    if (data.phoneNumber) {
      data.phoneNumber = formatPhoneNumber(data.phoneNumber);
    }

    return StudentModel.update(id, data);
  }

  static async deleteStudent(id: number): Promise<void> {
    const deleted = await StudentModel.delete(id);
    if (!deleted) {
      throw new Error('Student not found');
    }
  }

  static async getStudentStatistics(): Promise<any> {
    return StudentModel.getStatistics();
  }

  static async exportStudents(format: 'csv' | 'json' = 'json'): Promise<string> {
    const students = await StudentModel.findAll();
    
    if (format === 'csv') {
      // CSV header
      let csv = 'ID,Name,Email,Phone,GPA,Graduation Year,City,State,Latitude,Longitude\n';
      
      // CSV rows
      students.forEach(student => {
        csv += `${student.id},"${student.name}","${student.email}","${student.phoneNumber}",${student.gpa},${student.graduationYear},"${student.city || ''}","${student.state || ''}",${student.latitude || ''},${student.longitude || ''}\n`;
      });
      
      return csv;
    }
    
    return JSON.stringify(students, null, 2);
  }
}