import { useState } from 'react';
import { useStudents } from '../useStudents';
import { useStudentEditor } from '../useStudentEditor';
import { useConfirmation } from '../useConfirmation';
import { useViewToggle } from '../useViewToggle';

export const useStudentPageState = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Core data and operations
  const studentsData = useStudents();
  const { confirm } = useConfirmation();
  const statisticsToggle = useViewToggle();
  
  // Editor state and actions
  const editor = useStudentEditor({
    onCreate: studentsData.createStudent,
    onUpdate: studentsData.updateStudent,
  });

  // Action handlers
  const actions = {
    handleAddStudent: () => {
      editor.stopEditing();
      setIsModalOpen(true);
    },

    handleEditStudent: (student: any) => {
      editor.startEditing(student);
      setIsModalOpen(true);
    },

    handleCloseModal: () => {
      setIsModalOpen(false);
      editor.stopEditing();
    },

    handleDeleteStudent: (id: number) => {
      confirm(
        () => studentsData.deleteStudent(id),
        { message: 'Are you sure you want to delete this student?' }
      );
    },
  };

  return {
    // Data
    students: studentsData.students,
    loading: studentsData.loading,
    error: studentsData.error,
    
    // Editor state
    editingStudent: editor.editingStudent,
    
    // Modal state
    isModalOpen,
    
    // Statistics toggle
    showStatistics: statisticsToggle.isVisible,
    toggleStatistics: statisticsToggle.toggle,
    
    // Form handler
    handleSubmit: editor.handleSubmit,
    
    // Actions
    ...actions,
  };
}; 