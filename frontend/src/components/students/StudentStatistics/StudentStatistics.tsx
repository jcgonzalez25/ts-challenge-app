import React from 'react';
import { Student } from '../../../types/student.types';
import { useStudentStatistics } from '../../../hooks/useStudentStatistics';
import {
  OverviewSection,
  GPADistributionSection,
  GraduationYearsSection,
  GeographicDistributionSection,
} from '../StatisticsSections';

interface StudentStatisticsProps {
  students: Student[];
  className?: string;
}

const StudentStatistics: React.FC<StudentStatisticsProps> = ({ students, className = '' }) => {
  const stats = useStudentStatistics(students);

  if (students.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No statistics available. Add some students to see insights!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Statistics</h2>
        <p className="text-gray-600">Key insights and analytics about your student data</p>
      </div>

      {/* Overview Cards */}
      <OverviewSection stats={stats} />

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GPADistributionSection stats={stats} />
        <GraduationYearsSection stats={stats} />
        <GeographicDistributionSection stats={stats} />
      </div>
    </div>
  );
};

export default StudentStatistics; 