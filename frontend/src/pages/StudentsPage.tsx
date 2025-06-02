import React, { useState } from 'react';
import { PageLayout, StudentListSection } from '../components';
import StudentModal from '../components/students/StudentModal/StudentModal';
import { useStudents } from '../hooks/useStudents';
import { useStudentEditor } from '../hooks/useStudentEditor';
import { useConfirmation } from '../hooks/useConfirmation';

const StudentsPage: React.FC = () => {
  const { students, loading, error, createStudent, updateStudent, deleteStudent } = useStudents();
  const { confirm } = useConfirmation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    editingStudent,
    startEditing,
    stopEditing,
    handleSubmit,
  } = useStudentEditor({
    onCreate: createStudent,
    onUpdate: updateStudent,
  });

  const handleDelete = (id: number) => {
    confirm(
      () => deleteStudent(id),
      { message: 'Are you sure you want to delete this student?' }
    );
  };

  const handleAddStudent = () => {
    stopEditing(); // Clear any existing editing state
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: any) => {
    startEditing(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    stopEditing();
  };

  return (
    <PageLayout title="Student Management System">
      <StudentListSection
        students={students}
        loading={loading}
        error={error}
        onEdit={handleEditStudent}
        onDelete={handleDelete}
        onAddStudent={handleAddStudent}
      />
      
      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingStudent={editingStudent}
        isLoading={loading}
        onSubmit={handleSubmit}
      />
    </PageLayout>
  );
};

export default StudentsPage;