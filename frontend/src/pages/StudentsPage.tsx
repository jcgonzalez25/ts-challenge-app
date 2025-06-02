import React from 'react';
import { 
  PageLayout, 
  StudentPageHeader, 
  StudentPageContent, 
  StudentModal 
} from '../components';
import { useStudentPageState } from '../hooks';

const StudentsPage: React.FC = () => {
  const {
    // Data
    students,
    loading,
    error,
    
    // Modal & Editor state
    isModalOpen,
    editingStudent,
    
    // Statistics state
    showStatistics,
    toggleStatistics,
    
    // Actions
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleCloseModal,
    handleSubmit,
  } = useStudentPageState();

  return (
    <PageLayout title="Student Management System">
      <StudentPageHeader
        showStatistics={showStatistics}
        onToggleStatistics={toggleStatistics}
      />
      
      <StudentPageContent
        students={students}
        loading={loading}
        error={error}
        showStatistics={showStatistics}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
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