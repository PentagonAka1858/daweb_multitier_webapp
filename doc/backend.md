# Backend Documentation

# Table of content

- [Backend Documentation](#backend-documentation)
- [Table of content](#table-of-content)
- [Backend overview](#backend-overview)
- [Project structure](#project-structure)
- [Directory responsibilities](#directory-responsibilities)
- [Dependency management](#dependency-management)
- [Back to manual](#back-to-manual)

# Backend overview

The backend is a Spring Boot application built with Maven and packaged into a Docker image.
It exposes REST APIs consumed by the frontend and communicates with a MySQL database.

# Project structure

```
backend/
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com/company/project
│   │   │       ├── conf
│   │   │       ├── controllers
│   │   │       ├── entity
│   │   │       ├── repository
│   │   │       ├── service
│   │   │       └── ...
│   │   └── resources
│   │       └── application.properties
├── target
│   └── classes
│       └── com
│           └── company
│               └── project
│                   ├── conf
│                   ├── controllers
│                   └── ...
├── Dockerfile
└── pom.xml
```

# Directory responsibilities

`src/main/java/com/company/project/`

 - Main application source code.

`conf/`

 - Spring configuration classes
 - Beans, security, CORS, database configuration
 - Edit when:
   - Adding middleware
   - Configuring security or interceptors

`controllers/`

 - REST controllers
 - Defines API endpoints (@RestController)
 - Edit when:
    - Adding or modifying HTTP endpoints
    - Changing request/response structures

`entity/`

 - JPA entity classes
 - Maps Java objects to database tables
 - Edit when:
   - Modifying database schema
   - Adding new persistent models

`repository/`

 - Spring Data repositories
 - Database access layer
 - Edit when:
   - Adding new queries
   - Custom database operations

`service/`

 - Business logic
 - Orchestrates repositories and domain logic
 - Edit when:
   - Implementing application rules
   - Adding new features

`src/main/resources/application.properties`

 - Main configuration file
 - Database connection
 - Server port
 - Logging configuration

> [!CAUTION]
> Do not hardcode secrets here
> Use environment variables or Docker secrets instead.

# Dependency management

`pom.xml`

 - Maven configuration
 - Dependency declarations
 - Build plugins

Edit when:
 - Adding or upgrading dependencies
 - Changing Java version
 - Modifying build behavior

# Back to manual

 - [Manual](../README.md)
