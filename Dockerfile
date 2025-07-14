# Use Node.js 18 Alpine as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Astro application
RUN npm run build

# Production image, copy all the files and run astro
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 astro
RUN adduser --system --uid 1001 astro

# Copy the built application
COPY --from=builder --chown=astro:astro /app/dist ./dist
COPY --from=builder --chown=astro:astro /app/package.json ./package.json

# Install only production dependencies for serving
RUN npm install --only=production

USER astro

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

# Use astro preview to serve the built application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
