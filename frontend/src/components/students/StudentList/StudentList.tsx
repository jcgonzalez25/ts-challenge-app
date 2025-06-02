import React from 'react';
import { Student } from '../../../types/student.types';
import StudentListItem from './StudentListItem';

interface StudentListProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students found. Add a student to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {students.map((student) => (
        <StudentListItem
          key={student.id}
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentList;