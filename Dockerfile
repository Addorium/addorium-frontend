# syntax=docker/dockerfile:1

################################################################################
# Create a stage for building the application.
ARG NODE_VERSION=20.11.1
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.pnpm-store to speed up subsequent builds.
# Leverage bind mounts to pnpm-lock.yaml and package.json to avoid having to copy them into
# the container.
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Copy the source code into the container and build the application
COPY . .
RUN pnpm build

################################################################################
# Create a new stage for running the application that contains the minimal
# runtime dependencies for the application.
FROM node:${NODE_VERSION}-alpine AS final

RUN npm install -g pnpm

# Install any runtime dependencies needed to run the application.
RUN apk --update add \
    ca-certificates \
    tzdata \
    && update-ca-certificates

# Create a non-privileged user to run the application.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Set working directory
WORKDIR /app

# Copy the built application and node_modules from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port the application listens on
EXPOSE 3000

# What the container should run when it is started
CMD ["pnpm", "start"]
