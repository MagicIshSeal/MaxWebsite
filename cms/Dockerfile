FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Create uploads directory
RUN mkdir -p /app/public/uploads && chmod -R 777 /app/public

EXPOSE 1337

# Run in development mode (hot reload enabled)
CMD ["npm", "run", "develop"]
