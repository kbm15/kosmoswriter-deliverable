# Use official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy source code
COPY . .

# Start the server
CMD ["bun", "run", "index.ts"]