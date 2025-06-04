# Backend Testing Documentation

## 📋 Overview

This testing suite follows the **Testing Pyramid** principle with a comprehensive approach to ensure code quality and reliability.

```
        🔺 E2E Tests (5%)
       🔺🔺 Integration Tests (15%)
    🔺🔺🔺🔺 Unit Tests (80%)
```

## 🏗️ Testing Architecture

### **Test Types & Coverage**

| Test Type | Location | Purpose | Coverage |
|-----------|----------|---------|----------|
| **Unit Tests** | `utils/`, `services/` | Pure functions, business logic | 80% |
| **Integration Tests** | `routes/`, `app.test.ts` | Component interactions | 15% |
| **E2E Tests** | *(Not implemented yet)* | Full user journeys | 5% |

### **Mocking Strategy**

```typescript
// External Dependencies (Always Mocked)
- Database connections (Knex/MySQL)
- External APIs
- File system operations
- Environment variables

// Internal Dependencies (Conditionally Mocked)
- Models (mocked in service tests)
- Controllers (mocked in route tests)
- Services (mocked in controller tests)
```

## 🚀 Quick Start

### **Running Tests**

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run in watch mode (re-runs on file changes)
npm test -- --watch

# Run specific test file
npm test -- student.service.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should create student"

# Run tests in specific directory
npm test -- src/__tests__/services/
```

### **Coverage Targets**

- **Overall**: 80%+
- **Critical paths** (services, controllers): 90%+
- **Utilities**: 95%+
- **Routes**: 85%+

## 📁 File Structure

```
src/__tests__/
├── README.md                     # This documentation
├── setup.ts                      # Global test configuration
├── app.test.ts                   # Express app integration tests
├── routes/
│   └── student.routes.test.ts    # Route-level integration tests
├── services/
│   └── student.service.test.ts   # Business logic unit tests
├── controllers/                  # (Add controller tests here)
├── middleware/                   # (Add middleware tests here)
├── models/                       # (Add model tests here)
└── utils/
    └── sample.util.test.ts       # Utility function tests
```

## 🛠️ Writing Tests

### **1. Unit Tests (Services, Utils)**

**Purpose**: Test pure functions and business logic in isolation.

```typescript
// Template: src/__tests__/services/[service-name].service.test.ts
import { ServiceName } from '../../services/service-name.service';
import { ModelName } from '../../models/model-name.model';

// Mock external dependencies
jest.mock('../../models/model-name.model');
const mockedModel = ModelName as jest.Mocked<typeof ModelName>;

describe('ServiceName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('methodName', () => {
    it('should handle success case', async () => {
      // Arrange
      const input = { /* test data */ };
      const expectedOutput = { /* expected result */ };
      mockedModel.someMethod.mockResolvedValue(expectedOutput);

      // Act
      const result = await ServiceName.methodName(input);

      // Assert
      expect(mockedModel.someMethod).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should handle error case', async () => {
      // Arrange
      mockedModel.someMethod.mockRejectedValue(new Error('Test error'));

      // Act & Assert
      await expect(ServiceName.methodName({}))
        .rejects.toThrow('Test error');
    });
  });
});
```

### **2. Integration Tests (Routes)**

**Purpose**: Test HTTP endpoints and middleware integration.

```typescript
// Template: src/__tests__/routes/[resource].routes.test.ts
import request from 'supertest';
import { createApp } from '../../app';
import { ControllerName } from '../../controllers/controller-name.controller';

// Mock controllers
jest.mock('../../controllers/controller-name.controller');
const mockedController = ControllerName as jest.Mocked<typeof ControllerName>;

describe('Resource Routes', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/resource', () => {
    it('should return 200 with valid data', async () => {
      // Arrange
      mockedController.getAll.mockImplementation(async (req, res, next) => {
        res.status(200).json({ success: true, data: [] });
      });

      // Act & Assert
      await request(app)
        .get('/api/resource')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toEqual([]);
        });

      expect(mockedController.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
```

### **3. Utility Tests**

**Purpose**: Test pure functions, validators, formatters.

```typescript
// Template: src/__tests__/utils/[util-name].util.test.ts
import { functionName } from '../../utils/util-name';

describe('Utility: functionName', () => {
  describe('valid inputs', () => {
    it.each([
      ['input1', 'expected1'],
      ['input2', 'expected2'],
    ])('should transform %s to %s', (input, expected) => {
      expect(functionName(input)).toBe(expected);
    });
  });

  describe('invalid inputs', () => {
    it('should throw error for invalid input', () => {
      expect(() => functionName('invalid')).toThrow('Error message');
    });
  });
});
```

## 🔧 Configuration Files

### **Jest Configuration** (`jest.config.ts`)

```typescript
export default {
  // Test environment
  testEnvironment: 'node',
  
  // File patterns
  testMatch: ['**/__tests__/**/*.test.ts'],
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],
  
  // Mocking
  resetMocks: true,
  clearMocks: true,
};
```

### **Global Setup** (`setup.ts`)

```typescript
// Mock external dependencies globally
jest.mock('../config/database.config', () => ({
  getDb: jest.fn(() => mockDb),
  initializeDatabase: jest.fn().mockResolvedValue(true),
}));

// Environment variables for testing
process.env.NODE_ENV = 'test';
```

## 🎯 Testing Patterns

### **Arrange-Act-Assert (AAA)**

```typescript
it('should do something', async () => {
  // Arrange - Set up test data and mocks
  const input = { id: 1, name: 'Test' };
  mockService.method.mockResolvedValue(expectedResult);

  // Act - Execute the code being tested
  const result = await functionUnderTest(input);

  // Assert - Verify the results
  expect(result).toEqual(expectedResult);
  expect(mockService.method).toHaveBeenCalledWith(input);
});
```

### **Given-When-Then (BDD)**

```typescript
describe('Student creation', () => {
  describe('given valid student data', () => {
    const validStudent = { name: 'John', email: 'john@test.com' };

    describe('when creating a student', () => {
      it('then should return created student with ID', async () => {
        // Test implementation
      });
    });
  });
});
```

### **Test Data Factories**

```typescript
// src/__tests__/factories/student.factory.ts
export const StudentFactory = {
  build: (overrides = {}) => ({
    name: 'John Doe',
    email: 'john@example.com',
    graduationYear: 2024,
    phoneNumber: '5551234567',
    gpa: 3.8,
    ...overrides,
  }),

  buildList: (count: number, overrides = {}) => 
    Array.from({ length: count }, (_, i) => 
      StudentFactory.build({ ...overrides, id: i + 1 })
    ),
};

// Usage in tests
const student = StudentFactory.build({ name: 'Jane Doe' });
const students = StudentFactory.buildList(3);
```

## 🧪 Testing Best Practices

### **1. Test Naming**

```typescript
// ✅ Good - Descriptive and behavior-focused
describe('StudentService.createStudent', () => {
  it('should create student when valid data provided', () => {});
  it('should throw error when email already exists', () => {});
  it('should format phone number before saving', () => {});
});

// ❌ Bad - Implementation-focused
describe('StudentService', () => {
  it('test1', () => {});
  it('should call database insert', () => {});
});
```

### **2. Test Independence**

```typescript
// ✅ Good - Each test is independent
describe('StudentService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  it('test A', () => {
    // This test doesn't depend on test B
  });

  it('test B', () => {
    // This test doesn't depend on test A
  });
});
```

### **3. Mock Management**

```typescript
// ✅ Good - Clear mock setup and verification
it('should call external service', async () => {
  // Setup mock
  mockExternalService.call.mockResolvedValue('success');

  // Execute
  await serviceUnderTest.method();

  // Verify mock was called correctly
  expect(mockExternalService.call).toHaveBeenCalledWith(expectedParams);
  expect(mockExternalService.call).toHaveBeenCalledTimes(1);
});
```

### **4. Error Testing**

```typescript
// ✅ Good - Test both happy path and error cases
describe('getStudentById', () => {
  it('should return student when found', async () => {
    // Happy path test
  });

  it('should throw error when student not found', async () => {
    mockModel.findById.mockResolvedValue(null);
    
    await expect(service.getStudentById(999))
      .rejects.toThrow('Student not found');
  });

  it('should throw error when database fails', async () => {
    mockModel.findById.mockRejectedValue(new Error('DB Error'));
    
    await expect(service.getStudentById(1))
      .rejects.toThrow('DB Error');
  });
});
```

## 🔍 Debugging Tests

### **Common Issues**

1. **Mock not working**
   ```typescript
   // Ensure mock is before import
   jest.mock('../../services/student.service');
   import { StudentService } from '../../services/student.service';
   ```

2. **Async test timing out**
   ```typescript
   // Add async/await
   it('should work', async () => {
     await expect(asyncFunction()).resolves.toBe(expected);
   });
   ```

3. **Database mock issues**
   ```typescript
   // Check setup.ts for proper mocking
   // Verify mock is returning chainable object
   ```

### **Debug Tools**

```typescript
// Print test values
console.log('Debug value:', JSON.stringify(value, null, 2));

// Check mock calls
console.log('Mock calls:', mockFunction.mock.calls);

// Run single test
npm test -- --testNamePattern="specific test name"
```

## 📊 Coverage Analysis

### **Viewing Coverage**

```bash
# Generate coverage report
npm test -- --coverage

# Open HTML report
open coverage/lcov-report/index.html
```

### **Coverage Metrics**

- **Statements**: Lines of code executed
- **Branches**: Conditional paths taken
- **Functions**: Functions called
- **Lines**: Actual lines covered

### **Improving Coverage**

1. **Identify uncovered code**
   ```bash
   npm test -- --coverage --collectCoverageFrom="src/services/**"
   ```

2. **Add missing tests for uncovered branches**
   ```typescript
   // Test both true and false conditions
   if (condition) {
     // Test this path ✅
   } else {
     // Test this path too ✅
   }
   ```

## 🚨 Troubleshooting

### **Common Errors**

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Import path incorrect | Check relative paths |
| `db is not a function` | Database mock setup wrong | Check `setup.ts` mocking |
| `Test timeout` | Async operation not awaited | Add `async/await` |
| `Mock not called` | Mock setup after import | Move mock before import |

### **Debug Checklist**

- [ ] Are mocks set up before imports?
- [ ] Is `jest.clearAllMocks()` in `beforeEach`?
- [ ] Are async operations properly awaited?
- [ ] Are error cases tested?
- [ ] Is test data valid according to validation rules?

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)

## 🎯 Next Steps

1. **Add Controller Tests**
   - Test error handling in controllers
   - Test request/response transformation

2. **Add Middleware Tests**
   - Test validation middleware
   - Test error handling middleware

3. **Add E2E Tests**
   - Test complete user journeys
   - Test with real database (test environment)

4. **Performance Testing**
   - Load testing for API endpoints
   - Memory leak detection

5. **Security Testing**
   - Input validation testing
   - SQL injection prevention testing 