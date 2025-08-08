---
globs: __tests__/*.test.jsx
description: Ensure all network requests are mocked in tests to prevent real API
  calls and allow controlled testing of UI behavior
alwaysApply: true
---

Always mock API calls in test files using Jest's mock functions