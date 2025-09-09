# 📌 Prueba Técnica PEDBOX

Este repositorio contiene dos partes principales:

* **Backend**: API REST desarrollada con Node.js, Express y Sequelize.
* **Frontend**: Aplicación en Angular con Angular Material.

El sistema permite autenticación de usuarios con **JWT** y la gestión de información de **subreddits**.

---

# Base de Datos MySQL

### 1. `usuarios`
Tabla para almacenar la información de los usuarios registrados.


| Campo      | Tipo           | Restricciones              | Descripción                        |
|------------|----------------|----------------------------|------------------------------------|
| id         | INT            | PK, AI                     | Identificador único del usuario    |
| name       | VARCHAR(255)   | NOT NULL                   | Nombre del usuario                 |
| email      | VARCHAR(255)   | NOT NULL, UNIQUE           | Correo electrónico del usuario     |
| password   | VARCHAR(255)   | NOT NULL                   | Contraseña encriptada              |

### 2. `subreddits`
Tabla para almacenar la información de los subreddits obtenidos desde la API de Reddit.

| Campo                 | Tipo           | Restricciones              | Descripción                               |
|-----------------------|----------------|----------------------------|-------------------------------------------|
| id                    | INT            | PK, AI                     | Identificador único del subreddit         |
| reddit_id             | VARCHAR(50)    | NOT NULL                   | ID proporcionado por Reddit               |
| title                 | VARCHAR(255)   | NOT NULL                   | Título del subreddit                      |
| display_name_prefixed | VARCHAR(100)   | NOT NULL                   | Nombre mostrado (ej: r/Home)              |
| subscribers           | INT            | NULL                       | Número de suscriptores                    |
| name                  | VARCHAR(100)   | NULL                       | Nombre interno en Reddit (ej: t5_2qs0k)   |
| submit_text           | TEXT           | NULL                       | Texto de envío                            |
| created               | BIGINT         | NULL                       | Fecha de creación (timestamp UNIX)        |
| subreddit_type        | VARCHAR(50)    | NULL                       | Tipo de subreddit (ej: public, private)   |
| over18                | BOOLEAN        | DEFAULT FALSE              | Indica si es contenido NSFW               |
| description           | TEXT           | NULL                       | Descripción pública                       |

---

## ⚙️ Requisitos previos

Antes de empezar asegúrate de tener instalado:

* Node.js (recomendado: >= 20.x)
* npm (recomendado: >= 10.x)
* Angular CLI (recomendado: >= 18.x)
* Una base de datos compatible con Sequelize (ej.: MySQL o PostgreSQL)

---

## 🚀 Instalación (Resumen único para backend + frontend)

Clona el repositorio y sigue los pasos para backend y frontend.

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 🔹 Backend

1. Entra al directorio del backend:

```bash
cd Backend
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del backend con tu configuración (ejemplo):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=reddit_db
JWT_SECRET=PRUEBA_TECNICA_PEDBOX_SECRET
```

> Ajusta los valores según tu entorno (usuario y contraseña de la base de datos, puerto, etc.).

4. Levanta el servidor en modo desarrollo:

```bash
npm run dev
# o
node index.mjs
```

El backend quedará corriendo en: `http://localhost:3000`

---

### 🔹 Frontend

1. Entra al directorio del frontend:

```bash
cd Frontend/frontend-pedbox
```

2. Instala dependencias:

```bash
npm install
```

3. Levanta la aplicación Angular:

```bash
ng serve
```

El frontend quedará disponible en: `http://localhost:4200`

---

## 🔑 Autenticación

* El endpoint de login (`POST /api/auth/login`) devuelve un **token JWT**.
* El frontend guarda ese token en `localStorage` (ej: `localStorage.setItem('token', token)`).

```
Authorization: Bearer <tu_token>
```

## 📖 Endpoints principales (ejemplo)

* **POST** `/api/auth/login` → Iniciar sesión (devuelve token).
* **POST** `/api/auth/register` → Registrar usuario (puede devolver usuario y/o mensaje).
* **GET** `/api/subreddits` → Listar subreddits (requiere token).
* **PUT** `/api/update` → Actualizar subreddits desde Reddit (requiere token).
* **GET** `/api/subreddit/:id` → Obtener detalle de un subreddit por id (requiere token).

---
