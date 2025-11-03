# Use a Node.js base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install root dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Now handle the backend
WORKDIR /app/backend

# Copy backend package.json and package-lock.json
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Go back to the root
WORKDIR /app

# Expose the port the backend runs on. Railway provides a PORT env var automatically.
EXPOSE 3003

# Start the backend server
CMD ["node", "backend/index.js"]
