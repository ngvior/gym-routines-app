# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage 2: Build the app
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production dependencies
FROM node:22-alpine AS prod-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 4: Run the app
FROM node:22-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
