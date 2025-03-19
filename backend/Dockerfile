FROM node:20-alpine

WORKDIR /app

# Instalar CLI de NestJS globalmente en el contenedor
RUN npm install -g @nestjs/cli

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
