# Use Node 24 LTS
FROM node:24-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]