import React from 'react';
import { useStudents } from '../hooks/useStudents';
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {loading && students.length === 0 ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <StudentList students={students} />
        )}
      </div>
    </div>
  );
};

export default StudentsPage;