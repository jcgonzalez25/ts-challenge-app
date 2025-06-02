import React, { useState } from 'react';
import { CreateStudentDto } from '../../../types/student.types';
import { FormField, Button } from '../../common';

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
      <FormField
        label="Student Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <FormField
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormField
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        placeholder="(123) 456-7890"
      />

      <FormField
        label="Graduation Year"
        id="graduationYear"
        name="graduationYear"
        type="number"
        value={formData.graduationYear}
        onChange={handleChange}
        required
      />

      <FormField
        label="GPA"
        id="gpa"
        name="gpa"
        type="number"
        value={formData.gpa}
        onChange={handleChange}
        required
        step="0.01"
        min="0"
        max="4.0"
      />

      <FormField
        label="City"
        id="city"
        name="city"
        value={formData.city || ''}
        onChange={handleChange}
      />

      <FormField
        label="State"
        id="state"
        name="state"
        value={formData.state || ''}
        onChange={handleChange}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        variant="primary"
      >
        Add Student
      </Button>
    </form>
  );
};

export default StudentForm;