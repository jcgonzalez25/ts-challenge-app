# useAsyncOperation Hook

A generic React hook for handling asynchronous operations with consistent loading states, error handling, and operation lifecycle management.

## Overview

`useAsyncOperation` provides a standardized way to handle async operations across your application, eliminating repetitive try/catch blocks and loading state management.

## Key Features

- ✅ **Consistent Loading States** - Automatically manages loading state for any async operation
- ✅ **Centralized Error Handling** - Unified error handling with customizable error messages
- ✅ **Operation Lifecycle** - Clear start/success/error/complete phases
- ✅ **Flexible Error Propagation** - Choose to throw errors or handle them silently
- ✅ **TypeScript Support** - Fully typed with generic return types

## Basic Usage

```typescript
import { useAsyncOperation } from '../hooks/useAsyncOperation';
import { useState } from 'react';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { execute } = useAsyncOperation({
    setLoading,
    setError,
    onError: (error) => {
      // Global error handling
      console.error('Operation failed:', error);
    }
  });

  const handleSaveData = async () => {
    const result = await execute(
      () => api.saveData(formData),
      {
        errorMessage: 'Failed to save data',
        onSuccess: () => {
          console.log('Data saved successfully!');
        }
      }
    );
    
    // result contains the API response (if successful)
  };

  return (
    <div>
      {loading && <div>Saving...</div>}
      {error && <div>Error: {error}</div>}
      <button onClick={handleSaveData}>Save</button>
    </div>
  );
}
```

## Advanced Usage

### With Custom State Management

```typescript
import { useAsyncOperation } from '../hooks/useAsyncOperation';

function useCustomAsyncState() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null
  });

  const { execute } = useAsyncOperation({
    setLoading: (loading) => setState(prev => ({ ...prev, loading })),
    setError: (error) => setState(prev => ({ ...prev, error })),
  });

  return { state, execute };
}
```

### Silent Error Handling

```typescript
const { executeWithoutThrow } = useAsyncOperation({
  setLoading,
  setError,
});

// This won't throw errors, just handles them internally
const result = await executeWithoutThrow(
  () => api.fetchOptionalData(),
  { errorMessage: 'Optional data unavailable' }
);

if (result) {
  // Data loaded successfully
  setOptionalData(result);
}
```

### Multiple Operations

```typescript
function DataManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { execute } = useAsyncOperation({
    setLoading,
    setError,
  });

  const createUser = (userData) => execute(
    () => userApi.create(userData),
    { errorMessage: 'Failed to create user' }
  );

  const updateUser = (id, userData) => execute(
    () => userApi.update(id, userData),
    { errorMessage: 'Failed to update user' }
  );

  const deleteUser = (id) => execute(
    () => userApi.delete(id),
    { errorMessage: 'Failed to delete user' }
  );

  return { createUser, updateUser, deleteUser, loading, error };
}
```

## API Reference

### useAsyncOperation(config)

**Parameters:**
- `config.setLoading: (loading: boolean) => void` - Function to update loading state
- `config.setError: (error: string | null) => void` - Function to update error state  
- `config.onError?: (error: string) => void` - Optional global error handler

**Returns:**
- `execute<T>(operation, config?) => Promise<T | undefined>` - Execute operation with error handling
- `executeWithoutThrow<T>(operation, config?) => Promise<T | undefined>` - Execute without throwing

### execute(operation, config?)

**Parameters:**
- `operation: () => Promise<T>` - The async operation to execute
- `config.errorMessage?: string` - Custom error message (default: 'Operation failed')
- `config.onSuccess?: () => void` - Success callback
- `config.onError?: (error: string) => void` - Operation-specific error handler

**Returns:**
- `Promise<T | undefined>` - Operation result or undefined if failed

## Use Cases

### API Operations
Perfect for wrapping API calls with consistent error handling:

```typescript
const { execute } = useAsyncOperation({ setLoading, setError });

const saveProfile = () => execute(
  () => profileApi.update(profileData),
  { errorMessage: 'Failed to save profile' }
);
```

### File Operations
Handle file uploads/downloads with loading states:

```typescript
const uploadFile = (file) => execute(
  () => fileApi.upload(file),
  { 
    errorMessage: 'Failed to upload file',
    onSuccess: () => refreshFileList()
  }
);
```

### Data Processing
Wrap computationally expensive operations:

```typescript
const processData = () => execute(
  () => dataProcessor.process(rawData),
  { errorMessage: 'Failed to process data' }
);
```

## Benefits

### 🏗️ **Consistency**
- Standardized async operation patterns across the app
- Consistent error messages and handling
- Uniform loading state management

### 🧹 **Cleaner Code**
- Eliminates repetitive try/catch blocks
- No more manual loading state management
- Centralized error handling logic

### 🔧 **Flexibility**
- Works with any async operation
- Configurable error messages and callbacks
- Optional error propagation

### 🧪 **Testability**
- Easy to mock and test async operations
- Clear separation between operation logic and state management
- Predictable error handling patterns

This hook is the foundation for building other specialized hooks like `useStudentsApi`, `useUsersApi`, etc., providing consistent async operation handling across your entire application. 