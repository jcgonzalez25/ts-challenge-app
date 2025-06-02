import React from 'react';
import { Student } from '../../../types/student.types';
import { ErrorMessage, LoadingSpinner } from '../../common';
import SearchInput from '../../common/SearchInput/SearchInput';
import StudentList from '../StudentList/StudentList';
import { useStudentFilters } from '../../../hooks/useStudentFilters';
import { Button } from '../../common';

interface StudentListSectionProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddStudent: () => void;
}

const StudentListSection: React.FC<StudentListSectionProps> = ({
  students,
  loading,
  error,
  onEdit,
  onDelete,
  onAddStudent,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    toggleSort,
    filteredStudents,
    totalCount,
    filteredCount,
  } = useStudentFilters(students);

  const getSortIcon = (field: string) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  };

  return (
    <section>
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredCount} of {totalCount} students
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <Button
          onClick={onAddStudent}
          variant="primary"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search students by name, email, city, or state..."
            className="flex-1"
          />
          
          {/* Sort Options */}
          <div className="flex gap-2">
            {[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'graduationYear', label: 'Graduation' },
              { key: 'gpa', label: 'GPA' },
              { key: 'created_at', label: 'Date Added' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleSort(key as any)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  sortBy === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
                {getSortIcon(key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && <ErrorMessage message={error} />}

      {/* Loading State */}
      {loading && students.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <StudentList 
          students={filteredStudents} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </section>
  );
};

export default StudentListSection; 