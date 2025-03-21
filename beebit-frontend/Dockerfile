# Imagen base
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y lock para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto 3001
EXPOSE 3001

# Comando para desarrollo
CMD ["npm", "run", "dev"]
