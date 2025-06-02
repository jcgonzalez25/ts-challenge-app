import { getDb } from '../config/database.config';
import { Student, CreateStudentDto, UpdateStudentDto, StudentFilters } from '../types/student.types';

export class StudentModel {
  private static tableName = 'students';

  // Helper method to map database fields to API fields
  private static mapToApiFormat(dbStudent: any): Student {
    return {
      id: dbStudent.id,
      name: dbStudent.name,
      email: dbStudent.email,
      graduationYear: dbStudent.graduation_year,
      phoneNumber: dbStudent.phone_number,
      gpa: dbStudent.gpa,
      city: dbStudent.city,
      state: dbStudent.state,
      latitude: dbStudent.latitude,
      longitude: dbStudent.longitude,
      createdAt: dbStudent.created_at,
      updatedAt: dbStudent.updated_at,
    };
  }

  static async findAll(filters?: StudentFilters): Promise<Student[]> {
    const db = getDb()
    let query = db(this.tableName).select('*');

    if (filters) {
      if (filters.search) {
        query = query.where((builder) => {
          builder
            .where('name', 'like', `%${filters.search}%`)
            .orWhere('email', 'like', `%${filters.search}%`)
            .orWhere('city', 'like', `%${filters.search}%`);
        });
      }

      if (filters.graduationYear) {
        query = query.where('graduation_year', filters.graduationYear);
      }

      if (filters.minGpa !== undefined) {
        query = query.where('gpa', '>=', filters.minGpa);
      }

      if (filters.maxGpa !== undefined) {
        query = query.where('gpa', '<=', filters.maxGpa);
      }

      if (filters.city) {
        query = query.where('city', filters.city);
      }

      if (filters.state) {
        query = query.where('state', filters.state);
      }
    }

    const results = await query.orderBy('name', 'asc');
    return results.map(this.mapToApiFormat);
  }

  static async findById(id: number): Promise<Student | null> {
    const db = getDb()
    const student = await db(this.tableName)
      .where('id', id)
      .first();
    
    return student ? this.mapToApiFormat(student) : null;
  }

  static async findByEmail(email: string): Promise<Student | null> {
    const db = getDb()
    const student = await db(this.tableName)
      .where('email', email)
      .first();
    
    return student ? this.mapToApiFormat(student) : null;
  }

  static async create(data: CreateStudentDto): Promise<Student> {
    const db = getDb()
    const [id] = await db(this.tableName)
      .insert({
        name: data.name,
        email: data.email.toLowerCase(),
        graduation_year: data.graduationYear,
        phone_number: data.phoneNumber,
        gpa: data.gpa,
        city: data.city || null,
        state: data.state || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      })
      .returning('id');

    const student = await this.findById(id);
    if (!student) {
      throw new Error('Failed to create student');
    }

    return student;
  }

  static async update(id: number, data: UpdateStudentDto): Promise<Student> {
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email.toLowerCase();
    if (data.graduationYear !== undefined) updateData.graduation_year = data.graduationYear;
    if (data.phoneNumber !== undefined) updateData.phone_number = data.phoneNumber;
    if (data.gpa !== undefined) updateData.gpa = data.gpa;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.latitude !== undefined) updateData.latitude = data.latitude;
    if (data.longitude !== undefined) updateData.longitude = data.longitude;

    const db = getDb()
    updateData.updated_at = db.fn.now();

    await db(this.tableName)
      .where('id', id)
      .update(updateData);

    const student = await this.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  static async delete(id: number): Promise<boolean> {
    const db = getDb()
    const deleted = await db(this.tableName)
      .where('id', id)
      .delete();

    return deleted > 0;
  }

  static async getStatistics(): Promise<any> {
    const db = getDb()
    const stats = await db(this.tableName)
      .select(
        db.raw('COUNT(*) as total_students'),
        db.raw('AVG(gpa) as average_gpa'),
        db.raw('MAX(gpa) as highest_gpa'),
        db.raw('MIN(gpa) as lowest_gpa')
      )
      .first();

    const byYear = await db(this.tableName)
      .select('graduation_year')
      .count('* as count')
      .groupBy('graduation_year')
      .orderBy('graduation_year', 'desc');

    const byState = await db(this.tableName)
      .select('state')
      .count('* as count')
      .whereNotNull('state')
      .groupBy('state')
      .orderBy('count', 'desc');

    return {
      ...stats,
      students_by_year: byYear,
      students_by_state: byState
    };
  }
}