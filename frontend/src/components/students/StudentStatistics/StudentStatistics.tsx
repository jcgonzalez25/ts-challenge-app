import React from 'react';
import { Student } from '../../../types/student.types';
import { useStudentStatistics } from '../../../hooks/useStudentStatistics';
import { Card } from '../../common';

interface StudentStatisticsProps {
  students: Student[];
  className?: string;
}

const StudentStatistics: React.FC<StudentStatisticsProps> = ({ students, className = '' }) => {
  const stats = useStudentStatistics(students);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  }> = ({ title, value, subtitle, icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100',
    };

    return (
      <Card className="p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </Card>
    );
  };

  const ProgressBar: React.FC<{
    label: string;
    value: number;
    total: number;
    color: string;
  }> = ({ label, value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    
    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{value} ({percentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  if (students.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No statistics available. Add some students to see insights!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Statistics</h2>
        <p className="text-gray-600">Key insights and analytics about your student data</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          }
          color="blue"
        />

        <StatCard
          title="Average GPA"
          value={stats.averageGPA.toFixed(2)}
          subtitle={`Range: ${stats.lowestGPA.toFixed(2)} - ${stats.highestGPA.toFixed(2)}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="green"
        />

        <StatCard
          title="Recent Additions"
          value={stats.recentAdditions}
          subtitle="Last 30 days"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
          color="purple"
        />

        <StatCard
          title="Upcoming Graduations"
          value={stats.upcomingGraduations}
          subtitle="This year & next"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          }
          color="yellow"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GPA Distribution */}
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

        {/* Graduation Years */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Graduation Years</h3>
          <div className="space-y-2">
            {stats.graduationYearDistribution.slice(0, 6).map(({ year, count }) => (
              <div key={year} className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">{year}</span>
                <div className="flex items-center">
                  <div 
                    className="bg-blue-500 h-4 rounded mr-2"
                    style={{ width: `${(count / stats.totalStudents) * 100}px`, maxWidth: '100px' }}
                  />
                  <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top States */}
        {stats.topStates.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States</h3>
            <div className="space-y-2">
              {stats.topStates.map(({ state, count }) => (
                <div key={state} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-600">{state}</span>
                  <div className="flex items-center">
                    <div 
                      className="bg-purple-500 h-4 rounded mr-2"
                      style={{ width: `${(count / stats.totalStudents) * 100}px`, maxWidth: '100px' }}
                    />
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Top Cities */}
        {stats.topCities.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Cities</h3>
            <div className="space-y-2">
              {stats.topCities.map(({ city, count }) => (
                <div key={city} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-600">{city}</span>
                  <div className="flex items-center">
                    <div 
                      className="bg-indigo-500 h-4 rounded mr-2"
                      style={{ width: `${(count / stats.totalStudents) * 100}px`, maxWidth: '100px' }}
                    />
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentStatistics; 