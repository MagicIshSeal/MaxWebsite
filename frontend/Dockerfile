FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --production

FROM node:18-alpine AS builder
WORKDIR /app

# Accept version as build argument
ARG APP_VERSION=v1.0.0
ENV NEXT_PUBLIC_APP_VERSION=${APP_VERSION}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
