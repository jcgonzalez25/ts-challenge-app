import React from 'react';
import { Badge } from '../../../common';
import { formatStudentGPA } from '../../../../utils/displayUtils';

interface StudentHeaderProps {
  name: string;
  gpa: number | string;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ name, gpa }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
      <Badge variant="blue">
        GPA: {formatStudentGPA(gpa)}
      </Badge>
    </div>
  );
};

export default StudentHeader; 