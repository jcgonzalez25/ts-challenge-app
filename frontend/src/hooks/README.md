# Hooks Directory Structure

This directory follows a **directory-per-hook** organization pattern, where each hook and its related files are contained within their own subdirectory.

## Directory Structure

```
hooks/
├── index.ts                    # Main hooks exports
├── README.md                   # This documentation
├── MIGRATION_SUMMARY.md       # Migration guide
├── useForm/                    # Form management hook
│   ├── index.ts               # useForm exports
│   ├── types.ts               # Form-related TypeScript types
│   ├── useForm.ts             # Main composition hook
│   ├── useFormState.ts        # State management hook
│   ├── useFormValidation.ts   # Validation logic hook
│   ├── useFormHandlers.ts     # Event handlers hook
│   ├── README.md             # Form hooks documentation
│   └── examples.md           # Usage examples
├── useStudents/               # Students data hook
│   ├── index.ts              # useStudents exports
│   ├── types.ts              # Students-related types
│   ├── useStudents.ts        # Main composition hook
│   ├── useStudentsState.ts   # State management hook
│   ├── useStudentsApi.ts     # API operations hook
│   └── README.md            # Students hooks documentation
├── useAsyncOperation/         # Generic async operation hook
│   ├── index.ts              # useAsyncOperation exports
│   ├── types.ts              # Async operation types
│   ├── useAsyncOperation.ts  # Generic async handler
│   └── README.md            # Documentation
└── useApiCache/               # Generic API cache management
    ├── index.ts              # useApiCache exports
    ├── types.ts              # Cache-related types
    ├── useApiCache.ts        # Cache management logic
    └── README.md            # Documentation
```

## Hook Categories

### 🎯 **Domain-Specific Hooks**
Hooks that handle specific business logic and data management:

- **`useForm`** - Form state, validation, and submission management
- **`useStudents`** - Student data CRUD operations and state management

### 🔧 **Generic Utility Hooks**
Reusable hooks that provide common patterns across the application:

- **`useAsyncOperation`** - Standardized async operation handling with loading/error states
- **`useApiCache`** - Generic API cache management and invalidation

## Benefits of This Organization

### 🎯 **Encapsulation**
Each hook and its related files (types, tests, docs) are contained within their own directory, making them self-contained modules.

### 🔍 **Discoverability** 
It's immediately clear which files belong to which hook, making the codebase easier to navigate.

### 📈 **Scalability**
As hooks grow in complexity, they can have their own subdirectories without affecting the main hooks folder structure.

### 🧹 **Clean Imports**
You can import from `hooks/useForm` instead of `hooks/useForm.ts`, and the index file handles all the exports.

### 📝 **Co-location**
Related utilities, types, documentation, and tests can be kept alongside the hook implementation.

### ♻️ **Reusability**
Generic hooks like `useAsyncOperation` and `useApiCache` can be used across different domain-specific hooks and components.

## Usage Patterns

### Basic Imports (Recommended)
```typescript
// Domain-specific hooks
import { useForm } from '../hooks/useForm';
import { useStudents } from '../hooks/useStudents';

// Generic utility hooks
import { useAsyncOperation } from '../hooks/useAsyncOperation';
import { useApiCache } from '../hooks/useApiCache';
```

### Namespace Import
```typescript
import { 
  useForm, 
  useStudents, 
  useAsyncOperation, 
  useApiCache 
} from '../hooks';
```

### Advanced Import (Individual Hooks)
```typescript
import { useFormState, useFormValidation } from '../hooks/useForm';
import { useStudentsApi, useStudentsState } from '../hooks/useStudents';
```

### Type Imports
```typescript
import type { UseFormConfig, FormState } from '../hooks/useForm';
import type { AsyncOperationConfig } from '../hooks/useAsyncOperation';
```

## Creating New Domain Hooks

When creating a new domain-specific hook, leverage the generic utility hooks:

```typescript
// hooks/useUsers/useUsersApi.ts
import { useAsyncOperation } from '../useAsyncOperation';
import { useApiCache } from '../useApiCache';

export function useUsersApi(config) {
  const { execute } = useAsyncOperation({
    setLoading: config.setLoading,
    setError: config.setError,
    onError: config.onError,
  });

  const fetchUsers = useCallback(async () => {
    const data = await execute(
      () => userApi.getAll(),
      { errorMessage: 'Failed to fetch users' }
    );
    if (data) config.setUsers(data);
  }, [execute]);

  const { refetch } = useApiCache({
    fetchData: fetchUsers,
    config: { staleTime: 10 * 60 * 1000 } // 10 minutes
  });

  // CRUD operations using execute...
}
```

## Hook Composition Patterns

### Layered Architecture
```
┌─────────────────────────────────┐
│     Component Layer             │
│  (React Components)             │
└─────────────────────────────────┘
           │
┌─────────────────────────────────┐
│   Domain Hook Layer             │
│  (useStudents, useForm)         │
└─────────────────────────────────┘
           │
┌─────────────────────────────────┐
│  Generic Utility Layer          │
│ (useAsyncOperation, useApiCache)│
└─────────────────────────────────┘
```

### Composition Example
```typescript
// useStudentsApi composes generic hooks
function useStudentsApi(config) {
  const { execute } = useAsyncOperation(config);
  const cache = useApiCache({ fetchData: fetchStudents });
  
  // Student-specific logic using generic patterns
  const createStudent = (data) => execute(
    () => studentApi.create(data),
    { onSuccess: cache.invalidate }
  );
  
  return { createStudent, ...cache };
}

// useStudents composes state + api hooks
function useStudents(config) {
  const state = useStudentsState();
  const api = useStudentsApi(state);
  
  return { ...state, ...api };
}
```

## Best Practices

### 1. **Leverage Generic Hooks**
Use `useAsyncOperation` and `useApiCache` in your domain-specific hooks to maintain consistency.

### 2. **Keep Index Files Simple**
Only export what consumers need from your hook directories.

### 3. **Use Descriptive File Names**
Make the purpose of each file clear at a glance.

### 4. **Co-locate Related Files**
Keep types, utils, docs, and tests together with the hook implementation.

### 5. **Maintain Consistency**
Follow the same organizational pattern for all hooks.

### 6. **Document Complex Hooks**
Provide README and examples for non-trivial hooks.

### 7. **Compose Over Duplicate**
Use generic hooks to build domain-specific functionality rather than recreating patterns.

## Benefits of the New Architecture

### 🏗️ **Consistency**
- All async operations use the same loading/error patterns
- Standardized cache management across different data types
- Uniform error handling and messaging

### 🔄 **Reusability** 
- Generic hooks can be used across different domains (students, users, courses, etc.)
- Consistent patterns reduce learning curve for new developers
- Easy to extend functionality without duplication

### 🧪 **Testability**
- Generic hooks can be thoroughly tested once and reused
- Domain hooks can focus on business logic testing
- Clear separation of concerns makes mocking easier

### 🚀 **Developer Experience**
- Reduced boilerplate for new API operations
- Consistent interfaces across different data operations
- Better IntelliSense and type safety

This enhanced architecture provides a solid foundation for building scalable React applications with consistent patterns and reusable utilities. 