# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto (excepto los que están en .dockerignore)
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto 3000 para el servidor Next.js
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "dev"]
