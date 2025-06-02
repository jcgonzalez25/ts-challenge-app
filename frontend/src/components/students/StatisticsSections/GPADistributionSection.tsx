import React from 'react';
import Card from '../../common/Card';
import ProgressBar from '../../common/ProgressBar/ProgressBar';
import { StudentStatistics } from '../../../hooks/useStudentStatistics';

interface GPADistributionSectionProps {
  stats: StudentStatistics;
}

const GPADistributionSection: React.FC<GPADistributionSectionProps> = ({ stats }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Distribution</h3>
      <div className="space-y-3">
        <ProgressBar
          label="Excellent (3.5+)"
          value={stats.gpaDistribution.excellent}
          total={stats.totalStudents}
          color="bg-green-500"
        />
        <ProgressBar
          label="Good (3.0-3.49)"
          value={stats.gpaDistribution.good}
          total={stats.totalStudents}
          color="bg-blue-500"
        />
        <ProgressBar
          label="Satisfactory (2.5-2.99)"
          value={stats.gpaDistribution.satisfactory}
          total={stats.totalStudents}
          color="bg-yellow-500"
        />
        <ProgressBar
          label="Needs Improvement (<2.5)"
          value={stats.gpaDistribution.needsImprovement}
          total={stats.totalStudents}
          color="bg-red-500"
        />
      </div>
    </Card>
  );
};

export default GPADistributionSection; 