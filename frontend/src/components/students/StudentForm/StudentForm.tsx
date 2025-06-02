import React from 'react';
import { CreateStudentDto } from '../../../types/student.types';
import { FormField, Button } from '../../common';
import { useForm } from '../../../hooks/useForm';
import { required, email, phoneNumber, graduationYear, gpa, minLength } from '../../../utils/validators';

interface StudentFormProps {
  onSubmit: (data: CreateStudentDto) => Promise<void>;
  initialData?: Partial<CreateStudentDto>;
  isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, initialData, isLoading }) => {
  const form = useForm<CreateStudentDto>({
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      graduationYear: initialData?.graduationYear || new Date().getFullYear() + 4,
      phoneNumber: initialData?.phoneNumber || '',
      gpa: initialData?.gpa || 0,
      city: initialData?.city || '',
      state: initialData?.state || '',
    },
    validationSchema: {
      name: [required(), minLength(2, 'Name must be at least 2 characters long')],
      email: [required(), email()],
      phoneNumber: [required(), phoneNumber()],
      graduationYear: [required(), graduationYear()],
      gpa: [required(), gpa()],
      city: [], // Optional field
      state: [], // Optional field
    },
    validateOnBlur: true,
    validateOnSubmit: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await onSubmit(values);
        // Reset form after successful submission only if not editing
        if (!initialData) {
          resetForm();
        }
      } catch (error) {
        // Error handling is done in the parent component
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      <FormField
        label="Student Name"
        id="name"
        name="name"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        error={form.getFieldMeta('name').error}
        touched={form.getFieldMeta('name').touched}
      />

      <FormField
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        error={form.getFieldMeta('email').error}
        touched={form.getFieldMeta('email').touched}
      />

      <FormField
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        value={form.values.phoneNumber}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        placeholder="(123) 456-7890"
        helpText="Enter a 10-digit phone number"
        error={form.getFieldMeta('phoneNumber').error}
        touched={form.getFieldMeta('phoneNumber').touched}
      />

      <FormField
        label="Graduation Year"
        id="graduationYear"
        name="graduationYear"
        type="number"
        value={form.values.graduationYear}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        error={form.getFieldMeta('graduationYear').error}
        touched={form.getFieldMeta('graduationYear').touched}
      />

      <FormField
        label="GPA"
        id="gpa"
        name="gpa"
        type="number"
        value={form.values.gpa}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        step="0.01"
        min="0"
        max="4.0"
        helpText="Enter GPA on a 4.0 scale"
        error={form.getFieldMeta('gpa').error}
        touched={form.getFieldMeta('gpa').touched}
      />

      <FormField
        label="City"
        id="city"
        name="city"
        value={form.values.city || ''}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getFieldMeta('city').error}
        touched={form.getFieldMeta('city').touched}
      />

      <FormField
        label="State"
        id="state"
        name="state"
        value={form.values.state || ''}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.getFieldMeta('state').error}
        touched={form.getFieldMeta('state').touched}
      />

      <Button
        type="submit"
        isLoading={form.isSubmitting || isLoading}
        variant="primary"
        disabled={!form.isValid && form.submitCount > 0}
      >
        {initialData ? 'Update Student' : 'Add Student'}
      </Button>
    </form>
  );
};

export default StudentForm;