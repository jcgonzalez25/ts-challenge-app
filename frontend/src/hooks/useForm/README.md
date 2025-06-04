# useForm Hook

A comprehensive React hook for form state management, validation, and input formatting.

## Features

- 🎯 **Type-safe** - Full TypeScript support with generic types
- 🔄 **State Management** - Automatic form state handling (values, errors, touched, etc.)
- ✅ **Validation** - Flexible validation schema with built-in validators
- 🎨 **Formatting** - Input formatting with strategy pattern (phone, email, numbers)
- 📝 **Submission** - Async submission handling with loading states
- 🚀 **Performance** - Optimized with proper dependency management

## Quick Start

```typescript
import { useForm } from './hooks/useForm';
import { required, email, minLength } from './utils/validators';

interface LoginForm {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: {
      email: [required(), email()],
      password: [required(), minLength(8)]
    },
    formatters: {
      email: 'email' // Auto-lowercase and trim
    },
    onSubmit: async (values) => {
      await api.login(values);
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="email"
        type="email"
        value={form.values.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      {form.getFieldMeta('email').error && (
        <span className="error">{form.getFieldMeta('email').error}</span>
      )}
      
      <input
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      {form.getFieldMeta('password').error && (
        <span className="error">{form.getFieldMeta('password').error}</span>
      )}
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

## API Reference

### Configuration Options

```typescript
interface UseFormConfig<T> {
  initialValues: T;                                    // Initial form values
  validationSchema?: FormValidationSchema<T>;          // Validation rules per field
  formatters?: FormFormattersSchema<T>;                // Input formatters per field
  validateOnChange?: boolean;                          // Validate on input change (default: false)
  validateOnBlur?: boolean;                            // Validate on field blur (default: true)
  validateOnSubmit?: boolean;                          // Validate on form submit (default: true)
  onSubmit?: (values: T, helpers: FormHelpers<T>) => Promise<void> | void;
  enableReinitialize?: boolean;                        // Reinitialize when initialValues change
}
```

### Return Object

The hook returns an object with the following properties:

#### State
- `values: T` - Current form values
- `errors: Partial<Record<keyof T, FieldError>>` - Field errors
- `touched: Partial<Record<keyof T, boolean>>` - Which fields have been touched
- `isSubmitting: boolean` - Whether form is being submitted
- `isValidating: boolean` - Whether form is being validated
- `isValid: boolean` - Whether form is currently valid
- `isDirty: boolean` - Whether form has been modified
- `submitCount: number` - Number of submission attempts

#### Handlers
- `handleChange: (e: React.ChangeEvent<...>) => void` - Input change handler
- `handleBlur: (e: React.FocusEvent<...>) => void` - Input blur handler
- `handleSubmit: (e: React.FormEvent) => void` - Form submission handler

#### Helpers
- `setFieldValue: (field: keyof T, value: any) => void` - Set a specific field value
- `setFieldError: (field: keyof T, error: string | null) => void` - Set field error
- `setFieldTouched: (field: keyof T, touched?: boolean) => void` - Mark field as touched
- `getFieldProps: (field: keyof T) => FieldProps` - Get all props for a field
- `getFieldMeta: (field: keyof T) => FieldMeta` - Get field metadata (error, touched, invalid)
- `resetForm: (newValues?: Partial<T>) => void` - Reset form to initial state
- `validateField: (field: keyof T) => Promise<string | null>` - Validate single field
- `validateForm: () => Promise<boolean>` - Validate entire form

## Input Formatters

The `formatters` configuration allows you to specify how input values should be formatted:

```typescript
const form = useForm<StudentForm>({
  // ... other config
  formatters: {
    gpa: 'decimal',           // Round to 2 decimal places, allows clearing
    phoneNumber: 'phone',     // Format as (123) 456-7890
    email: 'email',           // Lowercase and trim
    graduationYear: 'integer', // Whole numbers only
    name: 'text'              // Plain text (default)
  }
});
```

### Available Formatters

| Type | Description | Example Input | Example Output |
|------|-------------|---------------|----------------|
| `text` | Plain text, no formatting | `"Hello World"` | `"Hello World"` |
| `number` | Numeric values, NaN for empty | `"123.45"` → `123.45`, `""` → `NaN` | Allows field clearing |
| `decimal` | Numbers rounded to 2 decimals | `"3.14159"` | `3.14` |
| `integer` | Whole numbers only | `"123.45"` | `123` |
| `phone` | US phone number format | `"1234567890"` | `"(123) 456-7890"` |
| `email` | Normalized email | `"  USER@Example.COM  "` | `"user@example.com"` |

## Validation

Use the validation schema to define rules for each field:

```typescript
import { required, email, minLength, maxLength, pattern } from './utils/validators';

const validationSchema = {
  email: [
    required('Email is required'),
    email('Please enter a valid email')
  ],
  password: [
    required(),
    minLength(8, 'Password must be at least 8 characters'),
    pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number')
  ],
  age: [
    required(),
    custom((value) => value >= 18, 'Must be 18 or older')
  ]
};
```

## Advanced Examples

### Dynamic Field Validation
```typescript
const form = useForm({
  initialValues: { confirmPassword: '', password: '' },
  validationSchema: {
    confirmPassword: [
      required(),
      custom((value, formData) => {
        return value === formData?.password;
      }, 'Passwords must match')
    ]
  }
});
```

### Programmatic Field Updates
```typescript
// Set field value programmatically
form.setFieldValue('email', 'user@example.com');

// Mark field as touched
form.setFieldTouched('email', true);

// Set custom error
form.setFieldError('email', 'Email already exists');

// Reset form with new values
form.resetForm({ email: 'new@example.com' });
```

### Custom Submission Logic
```typescript
const form = useForm({
  // ... config
  onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      setSubmitting(true);
      await api.createUser(values);
      resetForm(); // Clear form on success
    } catch (error) {
      if (error.field) {
        setFieldError(error.field, error.message);
      }
    } finally {
      setSubmitting(false);
    }
  }
});
```

## Best Practices

1. **Type Safety**: Always provide TypeScript interfaces for your form data
2. **Validation**: Use `validateOnBlur` for better UX, `validateOnSubmit` for final checks
3. **Formatting**: Configure formatters for consistent data handling
4. **Performance**: Use `getFieldProps()` for cleaner component code
5. **Error Handling**: Handle both field-level and form-level errors appropriately

## Integration with FormField Component

```typescript
// Clean integration with reusable FormField component
<FormField
  label="Email"
  required
  {...form.getFieldProps('email')}
  {...form.getFieldMeta('email')}
/>
```

This provides a powerful, flexible form solution that scales from simple contact forms to complex multi-step wizards. 