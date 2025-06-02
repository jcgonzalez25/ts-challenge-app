import React from 'react';
import Card from '../../common/Card';
import HorizontalBarChart from '../../common/HorizontalBarChart/HorizontalBarChart';
import { StudentStatistics } from '../../../hooks/useStudentStatistics';

interface GeographicDistributionSectionProps {
  stats: StudentStatistics;
}

const GeographicDistributionSection: React.FC<GeographicDistributionSectionProps> = ({ stats }) => {
  const statesData = stats.topStates.map(({ state, count }) => ({
    label: state,
    value: count,
  }));

  const citiesData = stats.topCities.map(({ city, count }) => ({
    label: city,
    value: count,
  }));

  if (statesData.length === 0 && citiesData.length === 0) {
    return null;
  }

  return (
    <>
      {/* Top States */}
      {statesData.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States</h3>
          <HorizontalBarChart
            data={statesData}
            total={stats.totalStudents}
            color="bg-purple-500"
            maxWidth={100}
          />
        </Card>
      )}

      {/* Top Cities */}
      {citiesData.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Cities</h3>
          <HorizontalBarChart
            data={citiesData}
            total={stats.totalStudents}
            color="bg-indigo-500"
            maxWidth={100}
          />
        </Card>
      )}
    </>
  );
};

export default GeographicDistributionSection; 