import React from 'react';
import { Button } from '../../../common';
import { Student } from '../../../../types/student.types';

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentActions: React.FC<StudentActionsProps> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 ml-4">
      {onEdit && (
        <Button
          onClick={() => onEdit(student)}
          variant="secondary"
          size="sm"
        >
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          onClick={() => onDelete(student.id)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default StudentActions; 