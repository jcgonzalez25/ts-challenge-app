# Student Management System Backend

A robust RESTful API built with TypeScript, Express.js, and MySQL for managing student records with comprehensive CRUD operations, filtering, statistics, and data export capabilities.

## 🏗️ Architecture

This backend follows a layered architecture pattern with clear separation of concerns:

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server startup and initialization
├── index.ts               # Main entry point
├── controllers/           # Request/response handling
│   └── student.controller.ts
├── services/              # Business logic layer
│   └── student.service.ts
├── models/                # Data access layer
│   └── student.model.ts
├── routes/                # API route definitions
│   └── student.routes.ts
├── middleware/            # Custom middleware (validation, error handling)
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── types/                 # TypeScript type definitions
│   ├── student.types.ts
│   ├── response.types.ts
│   └── error.types.ts
├── utils/                 # Utility functions
│   └── validators.ts
├── config/                # Configuration files
│   └── database.config.ts
├── db/                    # Database migrations and schema
│   └── migrations/
└── __tests__/             # Test suites
```


## 📡 API Endpoints

Base URL: `http://localhost:3000/api`

### Student Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/students` | Get all students with optional filtering | `?search=name&graduationYear=2024&minGpa=3.0&maxGpa=4.0&city=NYC&state=NY` |
| GET | `/students/:id` | Get student by ID | - |
| POST | `/students` | Create new student | Request body with student data |
| PUT | `/students/:id` | Update student | Request body with updated fields |
| DELETE | `/students/:id` | Delete student | - |
| GET | `/students/statistics` | Get student statistics | - |
| GET | `/students/export` | Export student data | `?format=csv` or `?format=json` |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |


### Student Schema

```typescript
interface Student {
  id: number;                    // Auto-increment primary key
  name: string;                  // Student full name
  email: string;                 // Unique email address
  graduationYear: number;        // Year of graduation
  phoneNumber: string;           // Formatted phone number
  gpa: number;                   // GPA (0.0 - 4.0)
  city?: string;                 // Optional city
  state?: string;                // Optional state
  latitude?: number;             // Optional coordinates
  longitude?: number;            // Optional coordinates
  createdAt: Date;               // Record creation time
  updatedAt: Date;               // Last update time
}
```

### Request/Response Examples

**Create Student Request**:
```json
{
  "name": "John Doe",
  "email": "john.doe@university.edu",
  "graduationYear": 2024,
  "phoneNumber": "555-123-4567",
  "gpa": 3.75,
  "city": "New York",
  "state": "NY",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**API Response Format**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@university.edu",
    "graduationYear": 2024,
    "phoneNumber": "555-123-4567",
    "gpa": 3.75,
    "city": "New York",
    "state": "NY",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🗄️ Database Schema

The application uses MySQL with the following table structure:

```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  graduation_year INT NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  gpa DECIMAL(3,2) NOT NULL CHECK (gpa >= 0 AND gpa <= 4),
  city VARCHAR(100),
  state VARCHAR(50),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_students_graduation_year (graduation_year),
  INDEX idx_students_gpa (gpa),
  INDEX idx_students_location (city, state)
);
```


## 🧪 Testing

The project includes comprehensive test coverage with Jest and Supertest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test -- student.service.test.ts
```

**Test Structure**:
- Unit tests for services and utilities
- Integration tests for API endpoints
- Test factories for generating test data
- Mocked database operations for isolation

See [TESTING.md](./TESTING.md) for detailed testing guidelines.


## 🔒 Validation & Error Handling

- **Input Validation**: All endpoints validate request data
- **Email Uniqueness**: Prevents duplicate email addresses
- **GPA Range**: Enforces 0.0-4.0 GPA range
- **Phone Formatting**: Standardizes phone number format
- **Structured Errors**: Consistent error response format

## 📈 Performance Features

- **Database Indexing**: Optimized queries with strategic indexes
- **Connection Pooling**: Efficient database connection management
- **Error Caching**: Proper error handling prevents cascading failures
- **Validation Middleware**: Early request validation

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | Database user | `student_user` |
| `DB_PASSWORD` | Database password | `student_password` |
| `DB_NAME` | Database name | `student_db` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |

## 🐛 Troubleshooting

**Common Issues**:

1. **Database Connection Failed**:
   - Verify MySQL is running
   - Check environment variables
   - Ensure database exists and user has permissions

2. **Migration Errors**:
   - Check migration file syntax
   - Verify database connectivity
   - Ensure proper migration order

3. **Validation Errors**:
   - Review request payload format
   - Check required fields
   - Verify data types match schema

## 🤝 Contributing

1. Follow TypeScript best practices
2. Write tests for new features
3. Update documentation for API changes
4. Use conventional commit messages
5. Run linting and tests before committing

## 📄 License

This project is part of the C3D TypeScript Challenge.
