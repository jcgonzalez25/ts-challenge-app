import React from 'react';
import { Student, CreateStudentDto } from '../../../types/student.types';
import Modal from '../../common/Modal/Modal';
import StudentForm from '../StudentForm/StudentForm';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingStudent: Student | null;
  isLoading: boolean;
  onSubmit: (data: CreateStudentDto) => Promise<void>;
}

const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  editingStudent,
  isLoading,
  onSubmit,
}) => {
  const handleSubmit = async (data: CreateStudentDto) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingStudent ? 'Edit Student' : 'Add New Student'}
      size="lg"
    >
      <StudentForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
        initialData={editingStudent || undefined}
        key={editingStudent?.id || 'new'}
      />
    </Modal>
  );
};

export default StudentModal; 