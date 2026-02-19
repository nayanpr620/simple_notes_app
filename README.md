# Notes App - CI/CD Error Test Project

A simple React.js notes application **intentionally built with CI/CD errors** for testing automated error detection and fixing tools.

## Purpose

This project is designed to be a test target for tools that:
- Detect CI/CD pipeline failures in GitHub repositories
- Automatically fix linting errors, test failures, and build issues
- Validate code quality in pull requests

## Intentional Errors

### 🔴 ESLint Errors (will fail `npm run lint`)
- **Unused variables** across multiple files
- **Unused imports** (React hooks, utilities)
- **`==` instead of `===`** (eqeqeq violations)
- **`console.log` statements** in production code
- **`var` instead of `const/let`**
- **Unreachable code** after return statements
- **`alert()` usage** in React components
- **Missing `key` prop** in list rendering
- **Undefined variables** referenced in code (`defaultCategory`)

### 🔴 Test Failures (will fail `npm test`)
- Tests looking for **wrong text content**
- Tests with **incorrect assertions**
- Tests expecting **elements that don't exist**
- Tests checking for **wrong CSS class names**
- Tests that fail due to **function mutation behavior**

### 🔴 Build Errors (will fail `npm run build`)
- Reference to **undefined variable** (`defaultCategory` in App.js)
- Build treats warnings as errors when `CI=true`

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs:
1. **Lint** → ESLint with strict rules (will FAIL)
2. **Test** → Jest tests (will FAIL)
3. **Build** → React production build (will FAIL)
4. **Deploy** → Deployment step (never reached)

## Getting Started

```bash
npm install
npm start     # Starts dev server (works with warnings)
npm run lint  # Will FAIL with ESLint errors
npm test      # Will FAIL with test failures  
npm run build # Will FAIL due to errors with CI=true
```

## Tech Stack
- React 18
- Jest + React Testing Library
- ESLint
- GitHub Actions CI/CD
