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