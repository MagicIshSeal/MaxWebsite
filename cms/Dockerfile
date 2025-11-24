FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app files
COPY . .

# Build Strapi admin panel
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
