FROM node:20-alpine

# Install openssl needed by Prisma on Alpine Linux
RUN apk add --no-cache openssl

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma Client
RUN npm install
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Start command (change to "npm run dev" or your specific start script)
CMD ["npm", "start"]