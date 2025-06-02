# useStudents Hook Module

A modular collection of React hooks for managing student data, following a **separation of concerns** pattern with focused, composable hooks.

## Overview

The `useStudents` module has been broken down into focused hooks that handle specific responsibilities:

- **`useStudentsState`** - State management (students array, loading, error)
- **`useStudentsApi`** - API operations (CRUD operations with error handling)
- **`useStudents`** - Main composition hook that combines the above

## Hook Structure

```
useStudents/
├── index.ts              # Hook exports
├── types.ts              # TypeScript interfaces
├── useStudents.ts        # Main composition hook
├── useStudentsState.ts   # State management
├── useStudentsApi.ts     # API operations
└── README.md            # This documentation
```

## Main Hook Usage

### Basic Usage

```typescript
import { useStudents } from '../hooks/useStudents';

function StudentsPage() {
  const {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refetch
  } = useStudents();

  // Component logic...
}
```

### With Configuration

```typescript
import { useStudents } from '../hooks/useStudents';

function StudentsPage() {
  const {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents({
    autoFetch: false, // Don't fetch on mount
    onError: (error) => {
      // Custom error handling
      showNotification(error, 'error');
    }
  });

  // Manual fetch when needed
  useEffect(() => {
    if (shouldFetch) {
      refetch();
    }
  }, [shouldFetch, refetch]);
}
```

## Individual Hook Usage

### useStudentsState

For components that only need state management:

```typescript
import { useStudentsState } from '../hooks/useStudents';

function StudentsDisplay() {
  const { 
    students, 
    loading, 
    error,
    setStudents,
    setLoading,
    setError 
  } = useStudentsState();

  // Custom logic for setting state...
}
```

### useStudentsApi

For components that need API operations with custom state:

```typescript
import { useStudentsApi } from '../hooks/useStudents';
import { useCustomState } from './useCustomState';

function StudentsManager() {
  const { setStudents, setLoading, setError } = useCustomState();
  
  const { 
    createStudent, 
    updateStudent, 
    deleteStudent,
    fetchStudents 
  } = useStudentsApi({
    setStudents,
    setLoading,
    setError,
    onError: (error) => handleError(error)
  });

  // Component logic...
}
```

## API Reference

### useStudents(config?)

Main composition hook that provides complete student management functionality.

**Parameters:**
- `config` (optional): Configuration object
  - `autoFetch?: boolean` - Whether to fetch students on mount (default: true)
  - `onError?: (error: string) => void` - Custom error handler

**Returns:**
- `students: Student[]` - Array of students
- `loading: boolean` - Loading state
- `error: string | null` - Error message
- `createStudent: (data: CreateStudentDto) => Promise<void>` - Create student
- `updateStudent: (id: number, data: Partial<CreateStudentDto>) => Promise<void>` - Update student
- `deleteStudent: (id: number) => Promise<void>` - Delete student
- `fetchStudents: () => Promise<void>` - Fetch students
- `refetch: () => Promise<void>` - Alias for fetchStudents

### useStudentsState()

Manages the local state for students data.

**Returns:**
- `students: Student[]` - Array of students
- `loading: boolean` - Loading state
- `error: string | null` - Error message
- `setStudents: (students: Student[]) => void` - Set students array
- `setLoading: (loading: boolean) => void` - Set loading state
- `setError: (error: string | null) => void` - Set error message
- `clearError: () => void` - Clear error message

### useStudentsApi(config)

Handles all API operations with proper error handling and loading states.

**Parameters:**
- `config`: Configuration object
  - `setStudents: (students: Student[]) => void` - Function to update students
  - `setLoading: (loading: boolean) => void` - Function to update loading state
  - `setError: (error: string | null) => void` - Function to update error state
  - `onError?: (error: string) => void` - Optional custom error handler

**Returns:**
- `createStudent: (data: CreateStudentDto) => Promise<void>` - Create student
- `updateStudent: (id: number, data: Partial<CreateStudentDto>) => Promise<void>` - Update student
- `deleteStudent: (id: number) => Promise<void>` - Delete student
- `fetchStudents: () => Promise<void>` - Fetch all students

## Benefits of This Structure

### 🎯 **Separation of Concerns**
- State management isolated in `useStudentsState`
- API logic isolated in `useStudentsApi`
- Composition logic in main `useStudents`

### 🔧 **Flexibility**
- Use individual hooks for custom requirements
- Compose hooks differently for different use cases
- Easy to test individual concerns

### 🧪 **Testability**
- Test state management separately from API logic
- Mock individual hooks for component testing
- Focused unit tests for each hook

### ♻️ **Reusability**
- `useStudentsState` can be used with different API implementations
- `useStudentsApi` can be used with different state management
- Easy to extend or modify individual parts

### 🔄 **Maintainability**
- Changes to API logic don't affect state management
- Changes to state logic don't affect API operations
- Clear boundaries between different responsibilities

## Migration Guide

The main `useStudents` hook maintains the same interface as before, so existing code should work without changes:

```typescript
// This still works exactly the same
const { students, loading, error, createStudent } = useStudents();
```

For advanced usage, you can now access individual hooks:

```typescript
// New: Use individual hooks for custom requirements
const state = useStudentsState();
const api = useStudentsApi({ ...state, onError: customHandler });
``` 