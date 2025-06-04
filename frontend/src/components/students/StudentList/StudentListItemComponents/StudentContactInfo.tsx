import React from 'react';
import { InfoField, InfoGrid } from '../../../common';
import { formatLocation } from '../../../../utils/displayUtils';

interface StudentContactInfoProps {
  email: string;
  phoneNumber: string;
  graduationYear: number;
  city?: string;
  state?: string;
}

const StudentContactInfo: React.FC<StudentContactInfoProps> = ({
  email,
  phoneNumber,
  graduationYear,
  city,
  state,
}) => {
  return (
    <InfoGrid columns={2} className="mb-3">
      <div>
        <InfoField label="Email" value={email} />
        <InfoField label="Phone" value={phoneNumber} />
      </div>
      <div>
        <InfoField label="Graduation Year" value={graduationYear} />
        {(city || state) && (
          <InfoField label="Location" value={formatLocation(city, state)} />
        )}
      </div>
    </InfoGrid>
  );
};

export default StudentContactInfo; 