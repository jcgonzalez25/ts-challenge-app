import React from 'react';
import { Student } from '../../../types/student.types';
import { Card, Button } from '../../common';

interface StudentListItemProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onEdit, onDelete }) => {
  return (
    <Card hover>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-lg">{student.name}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(student.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
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
      </div>
    </Card>
  );
};

export default StudentListItem;