# CRUD# HerramientasSoftPCA – Mini App Gestión de Tareas

## Descripción

API RESTful para gestión de tareas usando Node.js, Express y Firebase Firestore.  
Permite crear, listar, actualizar y eliminar tareas. Documentada con Swagger y lista para Docker.

## Requisitos previos
* Node.js 18 o superior
* Docker (opcional, para contenedores)
* Cuenta en Firebase
* Archivo de credenciales de Firebase (firebase-key.json)

# Configuración de Firebase
* Crea un proyecto en Firebase y habilita Cloud Firestore.
* Ve a Configuración del proyecto > Cuentas de servicio y descarga la clave privada JSON.
* Renombra el archivo como firebase-key.json y colócalo en la raíz del proyecto.
Este archivo no se publica por temas de seguridad con GitHub.

# Ejecutar en Local
1. **git clone https://github.com/jsanchezj-fsa/CRUD.git**
2. **cd CRUD**
3. **Abrir consola y usar el comando npm install seguido de npm start**
4. **Accede a la API en: http://localhost:3000/api/tasks**
5. **Documentación Swagger: http://localhost:3000/swagger-ui.html**

## Ejecutar con Docker
1. **git clone https://github.com/jsanchezj-fsa/CRUD.git**
2. **cd CRUD**
3. **Abrir consola y usar el comando docker build -t nombre_imagen.**
***Asegúrate de que el archivo firebase-key.json esté en la raíz del proyecto antes de construir la imagen***
4. **docker-compose up --build**
5. **Variables de entorno y credenciales**
**El archivo firebase-key.json debe estar en la raíz del proyecto.**
**Si usas Docker, se recomienda usar la variable de entorno:**
***GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-key.json dentro de docker-compose.yml***

## Endpoints principales
1. **GET /api/tasks – Lista todas las tareas**
2. **POST /api/tasks – Crea una nueva tarea**
3. **PUT /api/tasks/:id – Actualiza una tarea existente**
4. **DELETE /api/tasks/:id – Elimina una tarea**

## Ejemplo:
{
  "title": "Mi segunda tarea",
  "completed": false
}

# Documentación
**http://localhost:3000/swagger-ui.html**
