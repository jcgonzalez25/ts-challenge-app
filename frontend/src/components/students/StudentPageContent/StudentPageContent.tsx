import React from 'react';
import { StudentListSection } from '../../index';
import StudentStatistics from '../StudentStatistics/StudentStatistics';
import { Student } from '../../../types/student.types';

interface StudentPageContentProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  showStatistics: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddStudent: () => void;
}

const StudentPageContent: React.FC<StudentPageContentProps> = ({
  students,
  loading,
  error,
  showStatistics,
  onEdit,
  onDelete,
  onAddStudent,
}) => {
  return (
    <>
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
        onEdit={onEdit}
        onDelete={onDelete}
        onAddStudent={onAddStudent}
      />
    </>
  );
};

export default StudentPageContent; 