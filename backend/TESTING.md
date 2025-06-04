# Backend Testing Quick Start Guide

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-runs on changes)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific test file
npm test -- student.service.test.ts

# Specific test pattern
npm test -- --testNamePattern="should create student"
```

## 📁 Test Structure

```
src/__tests__/
├── README.md              # Full documentation
├── setup.ts               # Global test setup
├── factories/             # Test data factories
│   └── student.factory.ts
├── app.test.ts           # App integration tests
├── routes/               # Route integration tests
├── services/             # Service unit tests
└── utils/                # Utility unit tests
```

## 🧪 Writing Tests

### Unit Test Template
```typescript
import { ServiceName } from '../../services/service.service';
import { ModelName } from '../../models/model.model';

jest.mock('../../models/model.model');
const mockedModel = ModelName as jest.Mocked<typeof ModelName>;

describe('ServiceName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should do something', async () => {
    // Arrange
    const input = { /* test data */ };
    mockedModel.method.mockResolvedValue(expectedResult);

    // Act
    const result = await ServiceName.method(input);

    // Assert
    expect(mockedModel.method).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedResult);
  });
});
```

### Integration Test Template
```typescript
import request from 'supertest';
import { createApp } from '../../app';

describe('Resource Routes', () => {
  const app = createApp();

  it('should handle GET request', async () => {
    await request(app)
      .get('/api/resource')
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });
});
```

### Using Test Factories
```typescript
import { StudentFactory } from '../factories/student.factory';

// Create test data easily
const student = StudentFactory.buildCreateDto();
const students = StudentFactory.buildList(5);
const invalidStudent = StudentFactory.buildInvalid('email');
```

## 🎯 Testing Checklist

- [ ] **Happy path**: Test successful scenarios
- [ ] **Error cases**: Test validation and error handling
- [ ] **Edge cases**: Test boundary conditions
- [ ] **Mocking**: Mock external dependencies
- [ ] **Assertions**: Verify both results and interactions
- [ ] **Independence**: Tests don't depend on each other

## 🔧 Common Patterns

### Testing Async Functions
```typescript
it('should handle async operation', async () => {
  await expect(asyncFunction()).resolves.toBe(expected);
  await expect(asyncFunction()).rejects.toThrow('Error');
});
```

### Testing Error Cases
```typescript
it('should throw error when invalid', async () => {
  mockService.method.mockRejectedValue(new Error('Test error'));
  
  await expect(service.method()).rejects.toThrow('Test error');
});
```

### Parameterized Tests
```typescript
it.each([
  ['input1', 'expected1'],
  ['input2', 'expected2'],
])('should transform %s to %s', (input, expected) => {
  expect(transform(input)).toBe(expected);
});
```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Mock not working | Move `jest.mock()` before imports |
| Test timeout | Add `async/await` to promises |
| Database errors | Check mock setup in `setup.ts` |
| Import errors | Verify relative paths |

## 📊 Coverage Goals

- Overall: **80%+**
- Services: **90%+**
- Utils: **95%+**
- Routes: **85%+**

## 📚 More Info

See `src/__tests__/README.md` for comprehensive documentation. 