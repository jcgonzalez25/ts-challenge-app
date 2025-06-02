import React from 'react';
import { Student, CreateStudentDto } from '../../../types/student.types';
import StudentForm from '../StudentForm/StudentForm';

interface StudentFormSectionProps {
  editingStudent: Student | null;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: CreateStudentDto) => Promise<void>;
  onCancelEdit: () => void;
}

const StudentFormSection: React.FC<StudentFormSectionProps> = ({
  editingStudent,
  isEditing,
  isLoading,
  onSubmit,
  onCancelEdit,
}) => {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h2>
        {isEditing && (
          <button
            onClick={onCancelEdit}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <StudentForm 
        onSubmit={onSubmit} 
        isLoading={isLoading}
        initialData={editingStudent || undefined}
        key={editingStudent?.id || 'new'}
      />
    </section>
  );
};

export default StudentFormSection; 