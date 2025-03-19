# beebitGP

# 📌 Proyecto Backend - BeebitGP

Este documento contiene una recopilación de los **comandos utilizados** para gestionar el backend del proyecto BeebitGP con **NestJS, TypeORM y Docker**.

---

## 🚀 1. Iniciar y gestionar los contenedores con Docker

### 🔹 Iniciar el backend y la base de datos
```bash
docker compose up -d --build
```
- **Levanta el backend y la base de datos en Docker** con una reconstrucción de las imágenes.

### 🔹 Apagar y eliminar los contenedores
```bash
docker compose down
```

### 🔹 Ver estado de los contenedores activos
```bash
docker ps
```
- Lista los contenedores en ejecución.

```bash
docker compose ps
```
- Muestra los servicios gestionados por Docker Compose.

---

## 🛠 2. Conectarse a la Base de Datos PostgreSQL

### 🔹 Ingresar a PostgreSQL dentro del contenedor
```bash
docker compose exec db psql -U beebit -d beebit_db
```
- Abre una sesión de PostgreSQL en el contenedor de la base de datos.

### 🔹 Ver las tablas existentes en la base de datos
```sql
\d
```

---

## 🔍 3. Ver variables de entorno en el contenedor
```bash
docker compose exec backend env | grep DATABASE_
```
- Muestra las variables de entorno relacionadas con la base de datos.

---

## 📜 4. Ver logs del backend para depuración

### 🔹 Ver los últimos 50 logs
```bash
docker compose logs backend --tail=50
```

### 🔹 Ver logs en tiempo real
```bash
docker compose logs -f backend
```

---

## 🌐 5. Probar las API REST de `projects`

### 🔹 Obtener todos los proyectos
```bash
curl -X GET http://localhost:3000/projects
```

### 🔹 Obtener un proyecto por ID (Ejemplo: ID 2)
```bash
curl -X GET http://localhost:3000/projects/2
```

### 🔹 Crear un nuevo proyecto
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proyecto 1",
    "description": "Este es un proyecto de prueba",
    "image_url": "https://example.com/image.jpg",
    "start_date": "2024-03-19T00:00:00.000Z",
    "end_date": "2024-06-19T00:00:00.000Z",
    "status": "activo"
  }'
```

### 🔹 Actualizar un proyecto (Ejemplo: cambiar estado)
```bash
curl -X PUT http://localhost:3000/projects/2 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "finalizado"
  }'
```

### 🔹 Eliminar un proyecto
```bash
curl -X DELETE http://localhost:3000/projects/2
```

---

## 🛠 6. Verificar módulos cargados en NestJS

### 🔹 Ver qué controladores (`Controller`) están activos en la API
```bash
docker compose logs backend | grep "Controller"
```

### 🔹 Mostrar las rutas registradas en NestJS
```bash
docker compose logs backend | grep "Mapped"
```

---

## 🎯 Conclusión
Con estos comandos puedes gestionar **el backend en Docker, conectarte a PostgreSQL, verificar logs y probar la API REST** de manera sencilla.

Si necesitas modificar la API, recuerda **reconstruir el contenedor** con:
```bash
docker compose up -d --build
```

📌 **¡Listo para seguir con el desarrollo!** 🚀

