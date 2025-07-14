# Docker Deployment Guide

## Quick Start with Docker

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
npm run docker:up

# Stop the container
npm run docker:down
```

### Option 2: Using Docker directly

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

### Option 3: Manual Docker commands

```bash
# Build the image
docker build -t scratch-landing-page .

# Run the container
docker run -p 3000:3000 scratch-landing-page
```

## Accessing the Application

Once the container is running, you can access the application at:
- **http://localhost:3000**

## Development vs Production

- **Development**: Use `npm run dev` for hot reloading and development features
- **Production**: Use Docker for optimized, production-ready deployment

## Container Details

- **Base Image**: Node.js 18 Alpine Linux
- **Port**: 3000 (exposed and mapped)
- **Environment**: Production optimized
- **User**: Non-root user for security
- **Build**: Multi-stage build for smaller image size

## Environment Variables

You can customize the deployment by setting environment variables:

```bash
# Using docker run
docker run -p 3000:3000 -e NODE_ENV=production scratch-landing-page

# Using docker-compose (edit docker-compose.yml)
environment:
  - NODE_ENV=production
  - PORT=3000
  - HOST=0.0.0.0
```

## Troubleshooting

1. **Port already in use**: Change the port mapping `3000:3000` to `3001:3000` or another available port
2. **Build fails**: Ensure all dependencies are properly installed with `npm install`
3. **Container won't start**: Check logs with `docker logs scratch-landing-page`
