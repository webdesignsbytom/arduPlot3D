# version of ubuntu set up with node
# FROM ubuntu
FROM node:21

## Like cd to a main directory
## All instrctions will come from this directory
WORKDIR /app

## Cashe and store the build info
COPY package*.json ./

## Install info
RUN npm install

## COPY source code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

## Environment variables
ENV PORT=5000

EXPOSE 5000

## Start commands in 'exec form' 
CMD [ "npm", "start" ]