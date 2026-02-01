# Frontend Documentation

# Table of content

- [Frontend Documentation](#frontend-documentation)
- [Table of content](#table-of-content)
- [Frontend overview](#frontend-overview)
- [Project structure](#project-structure)
- [Directory responsibilities](#directory-responsibilities)
- [Configuration files](#configuration-files)
- [Back to manual](#back-to-manual)

# Frontend overview

The frontend is a **React application** written in TypeScript.
It communicates with the backend via HTTP and is served through **Nginx** in production.

# Project structure

```
frontend/
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logoX.svg
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   ├── setupProxy.js
│   └── setupTests.ts
├── Dockerfile
├── package.json
└── tsconfig.json
```

# Directory responsibilities

`public/`

 - Static assets
 - Served as-is
 - No JavaScript logic here

`index.html`

 - Main HTML entry point
 - React mounts into <div id="root">

> [!WARNING]
> Avoid editing unless necessary

`src/`

 - Main application source code.

`index.tsx`

 - Application entry point
 - Bootstraps React
 - Wraps the app in providers (router, state, etc.)

`App.tsx`

 - Root application component
 - Defines main layout and routes

`App.css / index.css`

 - Global styling
 - App-wide CSS rules

`serviceWorker.ts`

 - Progressive Web App support
 - Can be disabled if not needed

`setupProxy.js`

 - Development-only proxy
 - Redirects API calls to backend
 - Avoids CORS issues in development
 - Edit when:
   - Backend URL changes
   - Adding new API routes

`setupTests.ts`

 - Test configuration
 - Used by Jest

# Configuration files

`package.json`

 - Dependency list
 - Scripts (`start`, `build`, `test`)
 - Project metadata

Edit when:
 - Adding libraries
 - Updating scripts
 - Changing build behavior

`tsconfig.json`

 - TypeScript compiler configuration
 - Strictness rules
 - Path aliases

Edit when:
 - Adjusting TypeScript rules
 - Adding path mappings

# Back to manual

 - [Manual](../README.md)
