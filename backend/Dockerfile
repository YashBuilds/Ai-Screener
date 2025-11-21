# Stage 1: Build
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./ 

# Install all dependencies (including dev for building)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only package files
COPY --from=base /app/package.json ./ 
COPY --from=base /app/package-lock.json ./ 

# Install only production dependencies, skip scripts (Husky) to avoid errors
RUN npm install --production --ignore-scripts

# Copy built code
COPY --from=base /app/dist ./dist

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "dist/server.js"]
