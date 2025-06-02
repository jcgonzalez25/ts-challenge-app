import React, { useState } from 'react';
import { CreateStudentDto } from '../../../types/student.types';

interface StudentFormProps {
  onSubmit: (data: CreateStudentDto) => Promise<void>;
  initialData?: Partial<CreateStudentDto>;
  isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState<CreateStudentDto>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    graduationYear: initialData?.graduationYear || new Date().getFullYear() + 4,
    phoneNumber: initialData?.phoneNumber || '',
    gpa: initialData?.gpa || 0,
    city: initialData?.city || '',
    state: initialData?.state || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      if (!initialData) {
        setFormData({
          name: '',
          email: '',
          graduationYear: new Date().getFullYear() + 4,
          phoneNumber: '',
          gpa: 0,
          city: '',
          state: '',
        });
      }
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Student Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Add more fields here - email, graduation year, phone, GPA, etc. */}
      {/* For now, keeping it simple with just name */}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;