import React, { useState } from 'react';
import { PageLayout, StudentListSection } from '../components';
import StudentModal from '../components/students/StudentModal/StudentModal';
import StudentStatistics from '../components/students/StudentStatistics/StudentStatistics';
import { useStudents } from '../hooks/useStudents';
import { useStudentEditor } from '../hooks/useStudentEditor';
import { useConfirmation } from '../hooks/useConfirmation';
import { useViewToggle } from '../hooks/useViewToggle';

const StudentsPage: React.FC = () => {
  const { students, loading, error, createStudent, updateStudent, deleteStudent } = useStudents();
  const { confirm } = useConfirmation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isVisible: showStatistics, toggle: toggleStatistics } = useViewToggle();
  
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
      {/* Statistics Toggle */}
      <div className="mb-6">
        <button
          onClick={toggleStatistics}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
        </button>
      </div>

      {/* Statistics Section */}
      {showStatistics && (
        <div className="mb-8">
          <StudentStatistics students={students} />
        </div>
      )}

      {/* Student List Section */}
      <StudentListSection
        students={students}
        loading={loading}
        error={error}
        onEdit={handleEditStudent}
        onDelete={handleDelete}
        onAddStudent={handleAddStudent}
      />
      
      {/* Student Modal */}
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