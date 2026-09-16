# Task Management Service — Frontend

Angular frontend for [task-management-service](https://github.com/Samuel-Garrote/task-management-service), a hexagonal-architecture Spring Boot API with JWT authentication, Project/Task management, and Kafka event publishing.

🔗 **Live app:** https://task-management-service-frontend.vercel.app
🔗 **Backend API:** https://task-management-service-production-3b86.up.railway.app

## Features

- JWT-based authentication (register / login / logout)
- Route protection via functional guard (`authGuard`)
- Automatic `Authorization` header injection via HTTP interceptor
- Project management (create, list)
- Task management scoped by project (create, list by project)
- Reactive forms with inline error handling
- Signal-based state management (Angular signals, no NgRx)
- Dark, responsive UI

## Tech stack

- Angular 21 (standalone components, signals, `input()`/`computed()`)
- Reactive Forms
- Angular Router with `withComponentInputBinding()`
- RxJS (`Observable` + `tap()` for service-level side effects)
- SCSS

## Architecture

- `models/` — TypeScript interfaces matching the backend's real request/response shapes (not a 1:1 mirror of backend domain classes — only the fields actually needed)
- `services/` — `ProjectService`, `TaskService`, `AuthService`, each exposing a public signal for its collection/session state
- `interceptors/` — `authInterceptor`, attaches the JWT to outgoing requests
- `guards/` — `authGuard`, blocks protected routes when no session exists
- `components/` — standalone components, one per screen/piece of UI
- `environments/` — `environment.ts` / `environment.prod.ts`, swapped at build time via `fileReplacements`

## Running locally

```bash
npm install
ng serve
```

Requires the backend running locally (`http://localhost:8080` by default — see `environment.ts`).

## Building for production

```bash
ng build
```

Output: `dist/task-management-service-frontend/browser`

## Notes

This frontend was built to practice porting a UI pattern (originally developed in a small standalone Angular exercise) onto a real, already-existing backend with authentication and entity relationships — a step up in complexity from a typical CRUD-only practice project.
