---
description: Audit the codebase for error handling patterns, identify weaknesses, and suggest improvements based on engineering guidelines.
---

# Error Handling Audit

1. **Review Reference Standards**
   - Read the engineering guide at `docs/engineering/error-handling-patterns.md` (if it exists) to align on the expected patterns (Custom Errors, Result Types, etc.).

2. **Scan for Anti-Patterns**
   - **Empty Catch Blocks**: Search for `catch \(\w*\) \{\s*\}` or similar patterns where errors are swallowed.
   - **Generic Catches**: Look for `catch (Exception e)` or `except Exception:` (Python) that might be too broad.
   - **Console Errors**: Check for `console.error` or `print` usage in production code that should ideally use a proper logger or error reporting service.
   - **Keywords**: Search for `TODO`, `FIXME`, or `HACK` in proximity to `catch` or error logic.

3. **Identify Critical Paths & Reliability**
   - Locate critical external interactions:
     - API Clients / HTTP requests
     - Database queries
     - File System I/O
   - Check if these critical paths utilize:
     - **Retries**: Are transient failures handled?
     - **Timeouts**: Do requests hang indefinitely?
     - **Fallbacks**: Is there a default behavior if it fails?

4. **Suggest Improvements**
   - For each finding, propose a specific improvement from the reference guide:
     - "Implement a custom `ApiError` class for HTTP failures."
     - "Wrap this API call in a `retry` function with exponential backoff."
     - "Use a Circuit Breaker for this unstable third-party service."

5. **Report**
   - Generate a brief report summarizing:
     - Overall Health (Good/Mixed/Poor)
     - Key Risk Areas
     - List of Recommended Action Items
