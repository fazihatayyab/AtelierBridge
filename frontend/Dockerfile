FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

EXPOSE 5173

# Vite needs "--host 0.0.0.0" to be reachable outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]