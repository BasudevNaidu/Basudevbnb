# ─── Stage 1: Builder (install deps) ───────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ─── Stage 2: Runner (lean production image) ────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Copy installed node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy source code
COPY src/ ./src/
COPY package.json ./

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5001

CMD ["node", "src/index.js"]
