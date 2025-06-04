## 🏗️ Architecture

This frontend follows a component-based architecture with custom hooks for state management and clear separation of concerns:

```
src/
├── main.tsx                   # Application entry point
├── App.tsx                    # Root application component
├── index.css                  # Global styles with Tailwind
├── components/                # React components organized by domain
│   ├── index.ts              # Component exports
│   ├── common/               # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── EmptyState/
│   │   ├── ErrorMessage/
│   │   ├── FormField/
│   │   ├── HorizontalBarChart/
│   │   ├── LoadingSpinner/
│   │   ├── Modal/
│   │   ├── ProgressBar/
│   │   ├── SearchInput/
│   │   └── StatCard/
│   ├── layout/               # Layout components
│   └── students/             # Student-specific components
│       ├── StatisticsSections/
│       ├── StudentForm/
│       ├── StudentFormSection/
│       ├── StudentList/
│       ├── StudentListSection/
│       ├── StudentModal/
│       ├── StudentPageContent/
│       ├── StudentPageHeader/
│       └── StudentStatistics/
├── pages/                     # Page components
│   └── StudentsPage.tsx      # Main student management page
├── hooks/                     # Custom React hooks
│   ├── useApiCache/          # API cache management
│   ├── useAsyncOperation/    # Async operation handling
│   ├── useConfirmation/      # Confirmation dialogs
│   ├── useEditingState/      # Generic editing state
│   ├── useForm/              # Form state management
│   ├── useStudentEditor/     # Student editing workflow
│   ├── useStudentFilters/    # Search and filtering
│   ├── useStudentPageState/  # Page state composition
│   ├── useStudentStatistics/ # Analytics and metrics
│   ├── useStudents/          # Student data management
│   └── useViewToggle/        # UI state toggles
├── services/                  # API integration
│   └── api/
│       ├── apiClient.ts      # Axios configuration
│       └── studentApi.ts     # Student API methods
├── types/                     # TypeScript definitions
│   ├── api.types.ts          # API response types
│   ├── error.types.ts        # Error handling types
│   ├── response.types.ts     # Response structure types
│   └── student.types.ts      # Student data types
└── utils/                     # Utility functions
```

## 🚀 Features

- **Modern React 18**: Latest React features with TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **CRUD Operations**: Complete student management workflow
- **Real-time Search & Filtering**: Instant search and advanced filters
- **Data Visualization**: Statistics dashboard with charts
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Proper loading indicators and error states
- **Modal Interfaces**: Clean modal workflows for create/edit operations
- **Error Handling**: Comprehensive error management with user feedback
- **Custom Hooks**: Reusable logic with clean separation of concerns
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Code splitting and optimized bundle sizes

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:3000`

## 🛠️ Installation & Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration** (Optional):
   Create a `.env` file if you need to customize settings:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_PORT=5173
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🎨 Technology Stack

### Core Technologies
- **React 18.2.0** - Modern React with concurrent features
- **TypeScript 5.5.4** - Type-safe JavaScript
- **Vite 4.5.3** - Fast build tool and dev server
- **Tailwind CSS 3.4.0** - Utility-first CSS framework

### Development Tools
- **ESLint** - Code linting and style enforcement
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### API Integration
- **Axios 1.6.2** - HTTP client with interceptors
- **Custom API Client** - Centralized API configuration

## 🧩 Component Architecture

### Component Categories

**🎯 Domain Components** (`components/students/`)
- Student-specific UI components
- Business logic presentation
- Data-driven interfaces

**🔧 Common Components** (`components/common/`)
- Reusable UI elements
- Generic form components
- Layout utilities

**📄 Pages** (`pages/`)
- Top-level page components
- Route-based organization
- State orchestration

### Example Component Usage

```typescript
import { StudentsPage } from './pages/StudentsPage';
import { StudentModal, StudentList, SearchInput } from './components';
import { useStudentPageState, useStudentFilters } from './hooks';

const App: React.FC = () => {
  return <StudentsPage />;
};
```

## 🎣 Custom Hooks Architecture

The application uses a sophisticated custom hooks system organized by domain and functionality:

### Hook Categories

**🎯 Domain-Specific Hooks**
- `useStudents` - Student data CRUD operations
- `useStudentPageState` - Complete page state management
- `useStudentEditor` - Student editing workflow
- `useStudentFilters` - Search and filtering logic
- `useStudentStatistics` - Analytics calculations

**🔧 Generic Utility Hooks**
- `useAsyncOperation` - Standardized async handling
- `useApiCache` - API caching and invalidation
- `useForm` - Form state and validation
- `useEditingState` - Generic editing patterns
- `useConfirmation` - Modal confirmations
- `useViewToggle` - UI state toggles

### Hook Usage Example

```typescript
const StudentsPage: React.FC = () => {
  const {
    students,
    loading,
    error,
    isModalOpen,
    editingStudent,
    showStatistics,
    toggleStatistics,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleCloseModal,
    handleSubmit,
  } = useStudentPageState();

  // Component implementation...
};
```

## 📡 API Integration

### API Client Configuration

```typescript
// Centralized API client with interceptors
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Automatic error handling and response formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error handling with ApiResponse format
    console.error('API Error:', error);
    return Promise.reject(enhancedError);
  }
);
```

### Student API Methods

```typescript
export const studentApi = {
  getAll: () => Promise<Student[]>,
  getById: (id: number) => Promise<Student>,
  create: (data: CreateStudentDto) => Promise<Student>,
  update: (id: number, data: Partial<CreateStudentDto>) => Promise<Student>,
  delete: (id: number) => Promise<void>,
};
```

## 🎨 Styling & Design System

### Tailwind CSS Configuration

- **Utility-first approach** for rapid development
- **Responsive design** with mobile-first breakpoints
- **Customizable theme** with consistent spacing and colors
- **Component-based styling** with reusable patterns

### Design Patterns

```typescript
// Example component styling
const Button: React.FC<ButtonProps> = ({ variant, size, children, ...props }) => {
  const baseClasses = "font-medium rounded transition-colors focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 📊 Data Flow & State Management

### State Management Strategy

1. **Local Component State** - Simple UI state
2. **Custom Hooks** - Complex logic and data management
3. **Context (if needed)** - Global application state
4. **API State** - Server state with caching

### Data Flow Pattern

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │◄──►│  Custom Hooks   │◄──►│   API Layer     │
│                 │    │                 │    │                 │
│ - Presentation  │    │ - State Logic   │    │ - HTTP Requests │
│ - User Events   │    │ - Side Effects  │    │ - Error Handling│
│ - UI State      │    │ - Data Transform│    │ - Response Cache│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🔒 Error Handling & Validation

### Client-Side Validation
```typescript
const validateStudent = (data: CreateStudentDto): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(data.email)) errors.email = 'Invalid email format';
  
  if (!data.gpa || data.gpa < 0 || data.gpa > 4) {
    errors.gpa = 'GPA must be between 0.0 and 4.0';
  }
  
  return errors;
};
```

### Error Boundaries
- Global error boundary for unhandled errors
- Component-level error handling
- API error interceptors with user feedback


## 🧪 Testing Strategy

While not currently implemented, the recommended testing approach:

```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { StudentList } from './StudentList';

test('displays student list correctly', () => {
  const students = [
    { id: 1, name: 'John Doe', email: 'john@test.com', ... }
  ];
  
  render(<StudentList students={students} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});

// Hook testing
import { renderHook, act } from '@testing-library/react';
import { useStudents } from './useStudents';

test('useStudents manages state correctly', () => {
  const { result } = renderHook(() => useStudents());
  
  act(() => {
    result.current.addStudent(mockStudent);
  });
  
  expect(result.current.students).toHaveLength(1);
});