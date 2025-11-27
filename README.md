# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Flow

├── app/
│   ├── core/                  # Only essential app-wide singletons
│   │   ├── auth.service.ts    # Handles login, tokens, user state
│   │   ├── api.service.ts     # Central HTTP wrapper (HttpClient + interceptors)
│   │   ├── config.ts          # AppConfig interface + injection token
│   │   └── models/            # Shared interfaces (your "Interface" layer)
│   │       ├── user.ts
│   │       ├── product.ts
│   │       └── api-response.ts
│   │
│   ├── services/              # Feature-specific or reusable services
│   │   ├── user.service.ts
│   │   ├── cart.service.ts
│   │   └── notification.service.ts
│   │
│   ├── components/            # Reusable or page-level components
│   │   ├── header.component.ts|html
│   │   ├── product-list.component.ts|html
│   │   └── login-form.component.ts|html
│   │
│   ├── pages/                 # Route-driven "smart" components
│   │   ├── home-page/
│   │   ├── product-page/
│   │   └── profile-page/
│   │
│   ├── app.component.ts
│   └── app.module.ts          # Declare components, import Core services
│
├── environments/
├── assets/
└── styles/
# Booking
