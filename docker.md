# Docker (How this project is containerized)

This project runs as two containers using Docker Compose:
- `backend`: Node.js + Express REST API
- `frontend`: React (Vite) static build served by `nginx`, with `/api/*` proxied to the backend

---

## 1) Key files
- `docker-compose.yml` (root): defines services, network, ports, and required environment variables
- `backend/Dockerfile`: multi-stage build for the API
- `backend/.dockerignore`: reduces build context size (excludes `node_modules`, `.env*`, docs, etc.)
- `frontend/Dockerfile`: multi-stage build for the React app + `nginx` runtime
- `frontend/nginx.conf`: SPA routing + `/api` proxy to the backend
- `frontend/.dockerignore`: reduces build context size (excludes `node_modules`, `dist`, `.env*`, docs, etc.)

---

## 2) How the backend container is built (`backend/Dockerfile`)
Uses multi-stage build to keep the final image small:
1. **Builder stage** (`node:22-alpine`)
   - `WORKDIR /app`
   - `npm ci --omit=dev` installs only production dependencies
2. **Runner stage**
   - copies `node_modules` from the builder
   - copies `src/` and `package.json`
   - creates a non-root user (`appuser`) for safer runtime
   - runs: `node src/index.js`
   - exposes port `5001`

---

## 3) How the frontend container is built (`frontend/Dockerfile` + `frontend/nginx.conf`)
Uses multi-stage build:
1. **Builder stage** (`node:22-alpine`)
   - runs `npm run build` to generate the Vite production bundle into `dist/`
   - sets `ENV VITE_API_URL=/api` so the app calls the backend through the same origin
2. **Runner stage** (`nginx:1.25-alpine`)
   - deletes the default nginx web root
   - copies `dist/` into `/usr/share/nginx/html`
   - copies `frontend/nginx.conf` to `/etc/nginx/conf.d/default.conf`
   - exposes port `80`

`frontend/nginx.conf` does two important things:
- **SPA routing**: `try_files ... /index.html` so deep links work (React Router)
- **API proxy**: requests to `/api/` are forwarded to `http://backend:5001/api/`
  (the hostname `backend` comes from the Compose service name)

---

## 4) How Docker Compose wires everything together (`docker-compose.yml`)
Services:
- `backend`
  - built from `./backend`
  - host mapping: `5001:5001`
  - environment:
    - `PORT=5001`
    - `NODE_ENV=production`
    - `MONGO_URI=${MONGO_URI}`
    - `JWT_SECRET=${JWT_SECRET}`
- `frontend`
  - built from `./frontend`
  - host mapping: `3000:80` (browser access at `http://localhost:3000`)
  - `depends_on` ensures backend starts first

Networking:
- both containers attach to `basudevbnb-network` (bridge)
- containers communicate using service names (`backend` from nginx)

Note: there is **no MongoDB container** in this compose file. `MONGO_URI` must point to an external MongoDB (e.g., MongoDB Atlas).

---

## 5) Environment variables needed for Docker
Create a `.env` file in the project root (`Basudevbnb-Stack/.env`) with at least:
- `MONGO_URI=...`
- `JWT_SECRET=...`

Do not commit the `.env` file.

---

## 6) Build and run (commands)
Run these from the project root (`Basudevbnb-Stack/`):
```bash
docker compose up --build
```

Common commands:
```bash
# Build images only
docker compose build

# Start containers in background
docker compose up -d --build

# View logs (Ctrl+C to stop)
docker compose logs -f

# Check container status
docker compose ps

# Stop containers (keeps images)
docker compose down

# Stop containers and remove volumes (database data if you add one later)
docker compose down -v
```

After the images start:
- Frontend (React + nginx): `http://localhost:3000`
- Backend health check (through nginx proxy): `http://localhost:3000/api/health`
- Backend API (through proxy): `http://localhost:3000/api/...`
  (directly, backend listens on container port `5001`)

---

## 7) Why nginx is used (summary for faculty)
Instead of running the frontend dev server in Docker, we:
1. Build a production React bundle (`npm run build`)
2. Serve it with nginx (fast static hosting)
3. Proxy API calls to the backend so the browser talks to `/api/*` on the same origin.

