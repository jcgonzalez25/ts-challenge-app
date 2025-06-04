import React from 'react';
import { TimestampPair } from '../../../common';

interface StudentTimestampsProps {
  createdAt: string;
  updatedAt: string;
}

const StudentTimestamps: React.FC<StudentTimestampsProps> = ({ createdAt, updatedAt }) => {
  return <TimestampPair createdAt={createdAt} updatedAt={updatedAt} />;
};

export default StudentTimestamps; 