import { useMemo } from 'react';
import { Student } from '../types/student.types';

export interface StudentStatistics {
  totalStudents: number;
  averageGPA: number;
  highestGPA: number;
  lowestGPA: number;
  graduationYearDistribution: { year: number; count: number }[];
  topStates: { state: string; count: number }[];
  topCities: { city: string; count: number }[];
  recentAdditions: number; // Students added in last 30 days
  gpaDistribution: {
    excellent: number; // 3.5+
    good: number; // 3.0-3.49
    satisfactory: number; // 2.5-2.99
    needsImprovement: number; // < 2.5
  };
  upcomingGraduations: number; // Students graduating this year or next
}

export const useStudentStatistics = (students: Student[]): StudentStatistics => {
  return useMemo(() => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        averageGPA: 0,
        highestGPA: 0,
        lowestGPA: 0,
        graduationYearDistribution: [],
        topStates: [],
        topCities: [],
        recentAdditions: 0,
        gpaDistribution: {
          excellent: 0,
          good: 0,
          satisfactory: 0,
          needsImprovement: 0,
        },
        upcomingGraduations: 0,
      };
    }

    const currentYear = new Date().getFullYear();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Basic stats
    const totalStudents = students.length;
    const gpas = students.map(s => s.gpa).filter(gpa => gpa > 0);
    const averageGPA = gpas.length > 0 ? gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length : 0;
    const highestGPA = gpas.length > 0 ? Math.max(...gpas) : 0;
    const lowestGPA = gpas.length > 0 ? Math.min(...gpas) : 0;

    // Graduation year distribution
    const graduationYears = students.reduce((acc, student) => {
      const year = student.graduationYear;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const graduationYearDistribution = Object.entries(graduationYears)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);

    // State distribution
    const stateCount = students.reduce((acc, student) => {
      if (student.state) {
        acc[student.state] = (acc[student.state] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topStates = Object.entries(stateCount)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // City distribution
    const cityCount = students.reduce((acc, student) => {
      if (student.city) {
        acc[student.city] = (acc[student.city] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topCities = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent additions (last 30 days)
    const recentAdditions = students.filter(student => 
      new Date(student.created_at) >= thirtyDaysAgo
    ).length;

    // GPA distribution
    const gpaDistribution = students.reduce((acc, student) => {
      const gpa = student.gpa;
      if (gpa >= 3.5) acc.excellent++;
      else if (gpa >= 3.0) acc.good++;
      else if (gpa >= 2.5) acc.satisfactory++;
      else acc.needsImprovement++;
      return acc;
    }, {
      excellent: 0,
      good: 0,
      satisfactory: 0,
      needsImprovement: 0,
    });

    // Upcoming graduations (this year or next)
    const upcomingGraduations = students.filter(student => 
      student.graduationYear === currentYear || student.graduationYear === currentYear + 1
    ).length;

    return {
      totalStudents,
      averageGPA,
      highestGPA,
      lowestGPA,
      graduationYearDistribution,
      topStates,
      topCities,
      recentAdditions,
      gpaDistribution,
      upcomingGraduations,
    };
  }, [students]);
}; 