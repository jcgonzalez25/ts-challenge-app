import React from 'react';
import { Student } from '../../../types/student.types';
import { Card } from '../../common';
import {
  StudentHeader,
  StudentContactInfo,
  StudentCoordinates,
  StudentTimestamps,
  StudentActions,
} from './StudentListItemComponents';

interface StudentListItemProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onEdit, onDelete }) => {
  // Safely handle GPA conversion to number

  // Safely handle coordinate formatting

  return (
    <Card hover>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <StudentHeader name={student.name} gpa={student.gpa} />
          
          <StudentContactInfo
            email={student.email}
            phoneNumber={student.phoneNumber}
            graduationYear={student.graduationYear}
            city={student.city}
            state={student.state}
          />
          
          <StudentCoordinates
            latitude={student.latitude}
            longitude={student.longitude}
          />
          
          <StudentTimestamps
            createdAt={student.createdAt}
            updatedAt={student.updatedAt}
          />
        </div>

        <StudentActions
          student={student}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </Card>
  );
};

export default StudentListItem;