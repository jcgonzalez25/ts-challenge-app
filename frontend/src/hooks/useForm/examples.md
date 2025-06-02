# useForm Hook Examples

This document provides examples of how to use the enhanced `useForm` hook with validation capabilities.

## Basic Usage

```typescript
import { useForm } from '../hooks/useForm';
import { required, email, minLength } from '../utils/validators';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactFormComponent = () => {
  const form = useForm<ContactForm>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: {
      name: [required(), minLength(2)],
      email: [required(), email()],
      message: [required(), minLength(10, 'Message must be at least 10 characters')],
    },
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        await submitContact(values);
        resetForm();
      } catch (error) {
        console.error('Submit failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <FormField
        label="Name"
        id="name"
        name="name"
        value={form.values.name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        required
        error={form.getFieldMeta('name').error}
        touched={form.getFieldMeta('name').touched}
      />
      
      <Button type="submit" isLoading={form.isSubmitting} disabled={!form.isValid}>
        Submit
      </Button>
    </form>
  );
};
```

## Using FormFieldWrapper (Simplified)

```typescript
import { FormFieldWrapper } from '../components/common';

const SimpleForm = () => {
  const form = useForm<ContactForm>({
    // ... configuration
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <FormFieldWrapper
        form={form}
        name="name"
        label="Full Name"
        required
        helpText="Enter your full name"
      />
      
      <FormFieldWrapper
        form={form}
        name="email"
        label="Email Address"
        type="email"
        required
      />
      
      <Button type="submit" isLoading={form.isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
```

## Advanced Validation Examples

### Custom Validation Rules

```typescript
import { custom } from '../utils/validators';

const passwordMatch = (confirmPassword: string, formData: any) => {
  return confirmPassword === formData.password;
};

const signupForm = useForm({
  initialValues: {
    username: '',
    password: '',
    confirmPassword: '',
    age: 0,
  },
  validationSchema: {
    username: [
      required(),
      minLength(3),
      pattern(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    ],
    password: [
      required(),
      minLength(8, 'Password must be at least 8 characters'),
      custom(
        (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    ],
    confirmPassword: [
      required(),
      custom(passwordMatch, 'Passwords do not match'),
    ],
    age: [
      required(),
      numberRange(13, 120, 'Age must be between 13 and 120'),
    ],
  },
});
```

### Conditional Validation

```typescript
const shippingForm = useForm({
  initialValues: {
    sameAsShipping: false,
    shippingAddress: '',
    billingAddress: '',
  },
  validationSchema: {
    shippingAddress: [required()],
    billingAddress: [
      custom(
        (value, formData) => {
          // Only require billing address if it's different from shipping
          return formData?.sameAsShipping || (value && value.trim().length > 0);
        },
        'Billing address is required'
      ),
    ],
  },
});
```

## Form State Management

### Accessing Form State

```typescript
const form = useForm(config);

// Form values
console.log(form.values);

// Validation state
console.log(form.isValid);
console.log(form.errors);
console.log(form.touched);

// Submission state
console.log(form.isSubmitting);
console.log(form.submitCount);

// Dirty state (has user made changes?)
console.log(form.isDirty);
```

### Programmatic Form Control

```typescript
// Set field values
form.setFieldValue('email', 'user@example.com');

// Set multiple values
form.setValues({ name: 'John', email: 'john@example.com' });

// Set field errors (e.g., from server)
form.setFieldError('email', 'Email already exists');

// Set multiple errors
form.setErrors({
  email: 'Email already exists',
  username: 'Username is taken',
});

// Mark fields as touched
form.setFieldTouched('email', true);

// Reset form
form.resetForm();

// Reset with new values
form.resetForm({ name: 'New Name' });

// Validate specific field
const error = await form.validateField('email');

// Validate entire form
const isValid = await form.validateForm();
```

## Error Handling

### Server-side Validation Errors

```typescript
const form = useForm({
  // ... config
  onSubmit: async (values, { setErrors, setFieldError }) => {
    try {
      await submitForm(values);
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle multiple field errors from server
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          serverErrors[err.field] = err.message;
        });
        setErrors(serverErrors);
      } else if (error.response?.data?.field) {
        // Handle single field error
        setFieldError(error.response.data.field, error.response.data.message);
      }
    }
  },
});
```

## Validation Configuration Options

```typescript
const form = useForm({
  initialValues: { /* ... */ },
  validationSchema: { /* ... */ },
  
  // Validation timing
  validateOnChange: false,    // Validate on every keystroke
  validateOnBlur: true,       // Validate when field loses focus
  validateOnSubmit: true,     // Validate on form submission
  
  // Form behavior
  enableReinitialize: false,  // Reinitialize when initialValues change
  
  onSubmit: async (values, helpers) => {
    // Handle form submission
  },
});
```

## Available Validation Rules

```typescript
import {
  required,
  email,
  phoneNumber,
  gpa,
  graduationYear,
  minLength,
  maxLength,
  numberRange,
  pattern,
  custom,
} from '../utils/validators';

// Pre-built rules
required('This field is required')
email('Please enter a valid email')
phoneNumber('Please enter a valid phone number')
gpa('GPA must be between 0.0 and 4.0')
graduationYear('Please enter a valid graduation year')
minLength(5, 'Must be at least 5 characters')
maxLength(100, 'Must be no more than 100 characters')
numberRange(1, 10, 'Must be between 1 and 10')
pattern(/^\d+$/, 'Must contain only numbers')

// Custom rule
custom(
  (value, formData) => value !== 'forbidden',
  'This value is not allowed'
)
```

## Best Practices

1. **Define validation schemas outside components** to avoid recreating them on every render
2. **Use `validateOnBlur`** for better UX (less intrusive than `validateOnChange`)
3. **Always handle loading states** with `isSubmitting`
4. **Provide helpful error messages** and `helpText` for complex fields
5. **Use TypeScript generics** for type safety: `useForm<YourFormType>`
6. **Reset forms after successful submission** for create forms
7. **Mark all fields as touched** before showing validation errors on submit 