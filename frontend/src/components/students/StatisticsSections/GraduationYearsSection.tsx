import React from 'react';
import Card from '../../common/Card';
import HorizontalBarChart from '../../common/HorizontalBarChart/HorizontalBarChart';
import { StudentStatistics } from '../../../hooks/useStudentStatistics';

interface GraduationYearsSectionProps {
  stats: StudentStatistics;
}

const GraduationYearsSection: React.FC<GraduationYearsSectionProps> = ({ stats }) => {
  const chartData = stats.graduationYearDistribution.slice(0, 6).map(({ year, count }) => ({
    label: year.toString(),
    value: count,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Graduation Years</h3>
      <HorizontalBarChart
        data={chartData}
        total={stats.totalStudents}
        color="bg-blue-500"
        maxWidth={100}
      />
    </Card>
  );
};

export default GraduationYearsSection; 