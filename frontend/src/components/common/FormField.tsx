import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  step,
  min,
  max,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required={required}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
};

export default FormField; 