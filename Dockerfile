# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

RUN npm install -g pnpm


COPY pnpm-lock.yaml ./
COPY package.json ./
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


FROM node:${NODE_VERSION}-alpine AS final


ARG UID=10001
RUN adduser -D -g "" -h "/home/appuser" -u "${UID}" appuser

USER appuser
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]