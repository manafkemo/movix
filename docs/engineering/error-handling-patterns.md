# Error Handling Patterns & Best Practices

**Goal**: Build resilient applications with robust error handling strategies that gracefully handle failures and provide excellent debugging experiences.

## Core Concepts

### 1. Error Handling Philosophies

*   **Exceptions vs Result Types**:
    *   **Exceptions**: Traditional `try-catch`. Good for unexpected errors or exceptional conditions. Disrupts control flow.
    *   **Result Types**: Explicit success/failure (e.g., `Result<T, E>`). Functional approach. Good for expected errors and validation failures.
    *   **Error Codes**: C-style. Requires discipline. (Less recommended for modern high-level apps).
    *   **Option/Maybe Types**: For nullable values.
    *   **Panics/Crashes**: Only for unrecoverable errors or critical programming bugs (e.g., failed assertions).

### 2. Error Categories

*   **Recoverable Errors**:
    *   Network timeouts, Missing files, Invalid user input, API rate limits.
    *   *Strategy*: Retry, Fallback, User notification.
*   **Unrecoverable Errors**:
    *   Out of memory, Stack overflow, Programming bugs (NPE/Segfault).
    *   *Strategy*: Graceful shutdown, Crash reporting, Alerting.

---

## Universal Patterns

### Pattern 1: Circuit Breaker
*Prevent cascading failures in distributed systems.*

**Concept**:
- **Closed**: Normal operation.
- **Open**: Failing -> reject requests immediately (fail fast).
- **Half-Open**: Testing if recovered.

### Pattern 2: Error Aggregation
*Collect multiple errors instead of failing on the first one.*
Useful for validation (e.g., forms) where you want to show all errors at once.

### Pattern 3: Graceful Degradation
*Provide fallback functionality when errors occur.*
Example: If the live exchange rate API fails, use the last cached rate or a default value, while logging the error in the background.

---

## Language-Specific Patterns

### TypeScript/JavaScript

**Custom Error Classes**:
```typescript
class ApplicationError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500, public details?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends ApplicationError {
  constructor(resource: string, id: string) {
    super(`${resource} not found`, "NOT_FOUND", 404, { resource, id });
  }
}
```

**Result Type Pattern**:
```typescript
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function parseJSON<T>(json: string): Result<T, SyntaxError> {
  try {
    return { ok: true, value: JSON.parse(json) as T };
  } catch (error) {
    return { ok: false, error: error as SyntaxError };
  }
}
```

**Async Handling**:
Always handle Promise rejections. Use `try-catch` in `async` functions or `.catch()` chains.

### Python

**Custom Exceptions**:
```python
class ApplicationError(Exception):
    def __init__(self, message: str, code: str = None, details: dict = None):
        super().__init__(message)
        self.code = code
        self.details = details or {}
```

**Context Managers**:
Use `with` statement for cleanup (files, DB sessions/transactions).

**Decorators**:
Use decorators for Retries with Exponential Backoff.

### Rust
Use `Result<T, E>` and `Option<T>`. Use `?` operator for error propagation. Implement `From` trait for error conversion.

### Go
Explicit error returns `(val, err)`. Use `errors.Is` and `errors.As` (Go 1.13+). Wrapping errors with `fmt.Errorf("%w", err)`.

---

## Best Practices Checklist

1.  **Fail Fast**: Validate input early.
2.  **Preserve Context**: Include stack traces, metadata, and timestamps in logs.
3.  **Meaningful Messages**: Explain *what* happened and (if possible) *how* to fix it.
4.  **Log Appropriately**: Don't spam logs with expected failures. Use appropriate levels (INFO vs ERROR).
5.  **Handle at Right Level**: Catch where you can meaningfully handle (recover or report).
6.  **Clean Up Resources**: Use `finally`, `defer`, or context managers.
7.  **Don't Swallow Errors**: Never use empty catch blocks. Log or re-throw.
8.  **Type-Safe Errors**: Use typed errors when possible.

## Common Pitfalls
*   Catching too broadly (`except Exception:` or `catch (e)`) without checking type.
*   Empty catch blocks.
*   "Log and Re-throw" (creates duplicate noise unless handled carefully).
*   Returning -1 or null instead of explicit Result/Error types.
