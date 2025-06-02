import React from 'react';
import { useStudents } from '../hooks/useStudents';
import { ErrorMessage, LoadingSpinner } from '../components/common';
import StudentForm from '../components/students/StudentForm/StudentForm';
import StudentList from '../components/students/StudentList/StudentList';

const StudentsPage: React.FC = () => {
  const { students, loading, error, createStudent } = useStudents();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        <StudentForm 
          onSubmit={createStudent} 
          isLoading={loading}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        {error && (
          <ErrorMessage message={error} />
        )}
        {loading && students.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <StudentList students={students} />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;