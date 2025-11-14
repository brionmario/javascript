# @asgardeo/tanstack-router

## 1.0.6

### Patch Changes

- Updated dependencies
  [[`3a5f116`](https://github.com/asgardeo/javascript/commit/3a5f11677571fc3901ffa03968317c0fc558254c)]:
  - @asgardeo/react@0.6.6

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`0a65c1f`](https://github.com/asgardeo/javascript/commit/0a65c1fdb5084c5670d2ad0729a26f8adcdcbf8c)]:
  - @asgardeo/react@0.6.5

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`d2ac85b`](https://github.com/asgardeo/javascript/commit/d2ac85b356cce2d6a7b78125974006d3c7a6d934)]:
  - @asgardeo/react@0.6.4

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`7d932db`](https://github.com/asgardeo/javascript/commit/7d932db39b8b5b5d7fac7e7aa23b167e61ab83a6)]:
  - @asgardeo/react@0.6.3

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`93ef5c5`](https://github.com/asgardeo/javascript/commit/93ef5c50f999b24cb0786937e4a8226a27784804)]:
  - @asgardeo/react@0.6.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`3063eb8`](https://github.com/asgardeo/javascript/commit/3063eb8566cb0f1c03803ae6ed0fb5eaf5bfaa57)]:
  - @asgardeo/react@0.6.1

## 1.0.0

### Patch Changes

- Updated dependencies
  [[`2a85043`](https://github.com/asgardeo/javascript/commit/2a85043a71d9f20f923437bab74df4994593d754)]:
  - @asgardeo/react@0.6.0

## 0.1.3

### Patch Changes

- Updated dependencies
  [[`57bab5c`](https://github.com/asgardeo/javascript/commit/57bab5c76d935fcd3096169596dac5b6586751d7)]:
  - @asgardeo/react@0.5.33

## 0.1.2

### Patch Changes

- Updated dependencies
  [[`4fd4daf`](https://github.com/asgardeo/javascript/commit/4fd4dafb5c014be139af80ecbc941c70a73bf578)]:
  - @asgardeo/react@0.5.32

## 0.1.1

### Patch Changes

- Updated dependencies
  [[`2bf7be4`](https://github.com/asgardeo/javascript/commit/2bf7be42f298273fb6888bd55cf55e5eba3476a9)]:
  - @asgardeo/react@0.5.31

## 0.1.0

### Minor Changes

- [#176](https://github.com/asgardeo/javascript/pull/176)
  [`966a562`](https://github.com/asgardeo/javascript/commit/966a562f008fd4bd213ac7102816ec289ec0afe6) Thanks
  [@d3varaja](https://github.com/d3varaja)! - Add TanStack Router integration package with protected route support

  Introduce `@asgardeo/tanstack-router` - a new integration package that provides seamless authentication support for
  TanStack Router applications.

  **Key Features:**

  - `<ProtectedRoute>` component for auth-guarded routes
  - Automatic redirect to sign-in for unauthenticated users
  - Integration with Asgardeo authentication context
  - Type-safe route protection

  **Usage:**

  ```tsx
  import {ProtectedRoute} from '@asgardeo/tanstack-router';

  const Route = createFileRoute('/dashboard')({
    component: () => (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  });
  ```

  **Installation:**

  ```bash
  npm install @asgardeo/tanstack-router
  ```

  This is the initial release of the TanStack Router integration package.

### Patch Changes

- Updated dependencies
  [[`218f930`](https://github.com/asgardeo/javascript/commit/218f930c5f32b779c12af6c1a9fd0c5ea6879525)]:
  - @asgardeo/react@0.5.30

## 0.0.1

### Patch Changes

- Initial implementation of TanStack Router integration for Asgardeo React SDK. This package provides a `ProtectedRoute`
  component that enables route protection with authentication checks for applications using TanStack Router. The
  component supports redirects, fallback rendering, and loading states.
