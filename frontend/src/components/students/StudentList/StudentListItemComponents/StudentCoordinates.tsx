import React from 'react';
import { InfoField } from '../../../common';
import { formatCoordinate } from '../../../../utils/displayUtils';

interface StudentCoordinatesProps {
  latitude?: number | string;
  longitude?: number | string;
}

const StudentCoordinates: React.FC<StudentCoordinatesProps> = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const coordinateValue = `${formatCoordinate(latitude)}, ${formatCoordinate(longitude)}`;

  return (
    <div className="mb-3">
      <InfoField label="Coordinates" value={coordinateValue} />
    </div>
  );
};

export default StudentCoordinates; 