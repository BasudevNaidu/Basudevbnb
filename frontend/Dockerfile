# ─── Stage 1: Build the Vite React app ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# VITE_API_URL is set to /api so the browser hits the same host.
# nginx will proxy /api → backend container.
ENV VITE_API_URL=/api

RUN npm run build
# Output is in /app/dist

# ─── Stage 2: Serve with nginx ──────────────────────────────────────────────────
FROM nginx:1.25-alpine AS runner

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom nginx config (handles SPA routing + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
