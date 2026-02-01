# Multi-tier web application

# Table of content

- [Multi-tier web application](#multi-tier-web-application)
- [Table of content](#table-of-content)
- [Manual](#manual)
  - [Project structure](#project-structure)
    - [Folder structure](#folder-structure)
    - [Description of each directory](#description-of-each-directory)
  - [Role of each service](#role-of-each-service)
    - [Backend (Spring Boot)](#backend-spring-boot)
    - [Database (MySQL)](#database-mysql)
    - [Frontend (React)](#frontend-react)
    - [Proxy (Nginx)](#proxy-nginx)
    - [Monitoring (Komodo)](#monitoring-komodo)
  - [Deploying the environment](#deploying-the-environment)
    - [Requirements](#requirements)
    - [Deployment Steps](#deployment-steps)
  - [Description of configurable files and network](#description-of-configurable-files-and-network)
    - [Configurable Files](#configurable-files)
    - [Networks](#networks)
  - [Starting, stopping and updating the services](#starting-stopping-and-updating-the-services)
- [Administration manual](#administration-manual)
  - [Managing the services](#managing-the-services)
  - [Security considerations and applied measures](#security-considerations-and-applied-measures)
  - [Manteinance and scalability recommendations](#manteinance-and-scalability-recommendations)
  - [Summary of tests performed and results obtained](#summary-of-tests-performed-and-results-obtained)
- [Credits](#credits)

---

# Manual

## Project structure

### Folder structure

```
.
├── backend
│   ├── Dockerfile
│   └── ...
├── db
│   └── password.txt
├── frontend
│   ├── Dockerfile
│   └── ...
├── nginx
│   ├── Dockerfile
│   └── nginx.conf
├── docs
│   ├── images
│   │       ├── screenshot.png
│   │       └── ...
│   ├── backend.md
│   └── ...
├── compose.yaml
├── README_og_repo.md
└── README.md
```

### Description of each directory

`backend/`:
 - Contains the **Spring Boot backend application**
 - Includes a *Dockerfile* used by Docker Compose to build the backend image
 - The backend:
   - Connects to the MySQL database
   - Exposes APIs consumed by the frontend
   - Reads the database password from a Docker secret

`frontend/`:
 - Contains the **React frontend application**
 - The *Dockerfile* defines multiple stages; Compose explicitly builds the **development** stage
 - Source files are volume-mounted for live development
 - Communicates with the backend through an internal Docker network

`nginx/`:
 - Contains the **reverse proxy**
 - *nginx.conf* defines routing rules:
   - Incoming HTTP traffic (port 80)
   - Requests routed to frontend
 - Acts as the **single public entry** point to the system

`db/`:
 - Stores database-related files
 - *password.txt* is used to create a Docker secret for the MySQL root password
 - This password is never hard-coded into images or compose files

`komodo/`:
 - Contains the Spring Boot backend application
 - Includes a Dockerfile used by Docker Compose to build the backend image
 - The backend:
   - Connects to the MySQL database
   - Exposes APIs consumed by the frontend
   - Reads the database password from a Docker secret

`docs/`:
 - Auxiliary project documentation
 - Images for documentation and reports

`compose.yaml`:
 - Defines:
   - All services
   - Networks
   - Volumes
   - Secrets
 - Orchestrates how containers interact with each other

## Role of each service

### Backend (Spring Boot)

 - Built from *backend/Dockerfile*
 - Responsibilities:
   - Business logic
   - Database access
   - API exposure
 - Key features:
   - Uses `MYSQL_HOST=db` to connect to the database container
   - Waits for MySQL to become healthy before starting
   - Reads DB password securely from `/run/secrets/db-password`
 - Connected to:
   - *spring-mysql* (database communication)
   - *react-spring* (frontend communication)

### Database (MySQL)

 - Uses the official `mysql:8.0.19` image
 - Responsibilities:
   - Persistent data storage
 - Key features:
   - Root password injected via Docker secret
   - Healthcheck ensures MySQL is ready before backend starts
   - Data persisted using a named volume (`db-data`)
 - Connected only to:
   - *spring-mysql* (isolated from frontend and proxy)

### Frontend (React)

 - Built from `frontend/Dockerfile`, `development` stage
 - Responsibilities:
   - User interface
   - Sends HTTP requests to backend APIs
 - Key features:
   - Source code mounted as a volume for hot reload
   - `node_modules` kept inside the container to avoid host conflicts
 - Connected to:
   - `react-spring` (backend communication)
   - `proxy-react` (nginx communication)

### Proxy (Nginx)

 - Built from `nginx/Dockerfile`
 - Responsibilities:
   - Reverse proxy
   - Single exposed entry point (`localhost:80`)
 - Key features:
   - Routes traffic internally to frontend and backend
   - No application logic
 - Connected only to:
   - `proxy-react` (frontend communication)

### Monitoring (Komodo)

## Deploying the environment

### Requirements

 - Docker
 - Docker Compose

### Deployment Steps

```shell
docker compose up --build
```

This will:

 1. Create networks and volumes
 2. Build backend, frontend, and proxy images
 3. Start MySQL
 4. Wait for DB healthcheck
 5. Start backend
 6. Start frontend
 7. Start nginx proxy

The application becomes accessible at:

`http://localhost` or `http://localhost:80`

## Description of configurable files and network

### Configurable Files

| File                   | Purpose                          |
| :--------------------- | -------------------------------: |
| `compose.yaml`         | Service orchestration            |
| `backend/Dockerfile`   | Backend image definition         |
| `frontend/Dockerfile`  | Frontend image definition        |
| `nginx/nginx.conf`     | Request routing and proxy rules  |
| `db/password.txt`      | Database root password           |

> [!TIP]
> In the backend and frontend directories exists the source code for each service, to edit the code and integrate our app.

### Networks

| Network         | Purpose             |
| :-------------- | ------------------: |
| `spring-mysql`  | Backend ↔ Database  |
| `react-spring`  | Frontend ↔ Backend  |
| `proxy-react`   | Proxy ↔ Frontend    |

> [!IMPORTANT]
> This network topology ensures that each service can only talk to what it needs


## Starting, stopping and updating the services

As said before, to start the service we'll use:

```bash
docker compose up # add -d if you want to detach from terminal
```

To stop it, but keep the volumes (DB persists):

```bash
docker compose down
```

To stop and remove volumes (deletes DB data):

```bash
docker compose down -v
```

Update images:

```bash
docker compose up --build
```

---

# Administration manual

## Managing the services



## Security considerations and applied measures

## Manteinance and scalability recommendations

## Summary of tests performed and results obtained

# Credits

 - [Awesome-compose GitHub](https://github.com/docker/awesome-compose/tree/master/react-java-mysql) — Base repository to modify
