import React from 'react';
import { Student } from '../../../types/student.types';

interface StudentListItemProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-lg">{student.name}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(student.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(student)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(student.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentListItem;