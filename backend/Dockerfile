FROM node:20-alpine

WORKDIR /app

# Instalar CLI de NestJS globalmente en el contenedor
RUN npm install -g @nestjs/cli

COPY package.json package-lock.json ./

RUN npm install

RUN apk add --no-cache python3 make g++

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
