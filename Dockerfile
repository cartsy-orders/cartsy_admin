FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app (for SSR) or serve static files (if using `next export`)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Uncomment for static export (if using `next export`)
# COPY --from=builder /app/out ./out

EXPOSE 1000
CMD ["npm", "start"]  # For SSR (default)
# CMD ["npx", "serve", "out"]  # For static export (uncomment if using `next export`)