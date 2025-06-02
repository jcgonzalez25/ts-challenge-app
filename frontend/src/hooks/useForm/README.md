# Form Hooks Architecture

This directory contains a modular form management system broken down into focused, reusable hooks.

## Hook Structure

### 1. **form.types.ts** - Type Definitions
Central location for all form-related TypeScript interfaces and types.

- `FieldError` - Error structure with message and type
- `FormState<T>` - Form state interface
- `FormHelpers<T>` - Helper functions interface  
- `FormHandlers<T>` - Event handlers interface
- `UseFormConfig<T>` - Main hook configuration
- `UseFormReturn<T>` - Complete return type

### 2. **useFormState.ts** - State Management
Manages core form state including values, errors, touched fields, and submission state.

**Responsibilities:**
- Form values state
- Error state management
- Touched fields tracking
- Submission and validation state
- Computed state (isValid, isDirty)
- State helper functions

**Key Functions:**
- `setFieldValue` - Update single field value
- `setFieldError` - Set field-specific error
- `setFieldTouched` - Mark field as touched
- `resetForm` - Reset form to initial state
- `markAllTouched` - Mark all fields as touched

### 3. **useFormValidation.ts** - Validation Logic
Handles all validation logic including field-level and form-level validation.

**Responsibilities:**
- Field validation
- Form validation
- Conditional validation based on configuration
- Error message generation

**Key Functions:**
- `validateField` - Validate single field
- `validateForm` - Validate entire form
- `validateOnChangeIfEnabled` - Conditional change validation
- `validateOnBlurIfEnabled` - Conditional blur validation
- `validateOnSubmitIfEnabled` - Conditional submit validation

### 4. **useFormHandlers.ts** - Event Handling
Manages form event handlers, field props generation, and form submission.

**Responsibilities:**
- Input change handling
- Input blur handling
- Form submission handling
- Field props generation
- Field metadata generation

**Key Functions:**
- `handleChange` - Input change handler
- `handleBlur` - Input blur handler
- `handleSubmit` - Form submission handler
- `getFieldProps` - Generate field props
- `getFieldMeta` - Generate field metadata

### 5. **useForm.ts** - Main Composition Hook
Composes all the smaller hooks into a unified interface.

**Responsibilities:**
- Hook composition
- Configuration distribution
- Unified API surface
- Type re-exports

## Usage Examples

### Basic Usage
```typescript
import { useForm } from './hooks/useForm';
import { required, email } from './utils/validators';

const MyForm = () => {
  const form = useForm({
    initialValues: { name: '', email: '' },
    validationSchema: {
      name: [required()],
      email: [required(), email()],
    },
    onSubmit: async (values) => {
      await submitData(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input {...form.getFieldProps('name')} />
      <input {...form.getFieldProps('email')} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Advanced Usage with Custom Validation
```typescript
const form = useForm({
  initialValues: { password: '', confirmPassword: '' },
  validationSchema: {
    password: [required(), minLength(8)],
    confirmPassword: [
      required(),
      custom((value, formData) => value === formData.password, 'Passwords must match')
    ],
  },
  validateOnChange: true,
  validateOnBlur: true,
});
```

## Benefits of This Architecture

### 1. **Separation of Concerns**
Each hook has a single, focused responsibility making them easier to understand and maintain.

### 2. **Testability**
Smaller hooks can be tested in isolation with focused test cases.

### 3. **Reusability**
Individual hooks can be reused in different contexts or combined differently.

### 4. **Type Safety**
Comprehensive TypeScript interfaces ensure type safety across all hooks.

### 5. **Performance**
Focused hooks with targeted dependencies reduce unnecessary re-renders.

### 6. **Maintainability**
Changes to specific functionality only affect the relevant hook.

## Hook Dependencies

```
useForm (main)
├── useFormState (state management)
├── useFormValidation (validation logic)
└── useFormHandlers (event handling)
    ├── Uses: useFormState results
    ├── Uses: useFormValidation results
    └── Receives: form configuration
```

## Extending the System

### Adding New Validation Rules
Add to `utils/validators.ts`:
```typescript
export const customRule = (message: string): ValidationRule => ({
  validate: (value) => /* validation logic */,
  message,
});
```

### Adding New Hook Features
Create focused hooks that can be composed into the main `useForm` hook:
```typescript
const useFormAnalytics = (formState) => {
  // Track form interactions
};

// Integrate in useForm.ts
const analytics = useFormAnalytics(formState);
```

### Custom Form Components
Use individual hooks for specialized use cases:
```typescript
const MyCustomFormComponent = () => {
  const state = useFormState(config);
  const validation = useFormValidation(config);
  // Custom composition
};
```

## Migration from Previous Version

The new modular structure maintains the same API surface, so existing code should work without changes:

```typescript
// This still works exactly the same
const form = useForm({ /* config */ });
form.handleSubmit();
form.getFieldProps('name');
form.isValid;
```

The only difference is the internal structure is now more maintainable and extensible. 