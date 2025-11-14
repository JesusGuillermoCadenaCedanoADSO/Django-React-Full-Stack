Django + React Full Stack App (JWT, Render, Vite, Axios Interceptors)
🚀 Descripción del Proyecto

Este proyecto es una aplicación Full Stack construida con:

Backend: Django + Django REST Framework + SimpleJWT

Frontend: React + Vite

Autenticación: JWT con refresh automático mediante interceptores de Axios

Despliegue: Render (backend y frontend por separado)

Incluye:

Registro de usuarios

Login con generación de tokens

Protección de rutas

Creación, listado y eliminación de notas

Manejo automático de expiración del token de acceso

📝 Resumen de lo aprendido (conceptos clave)
✔ Django + DRF

Creación de endpoints REST.

Manejo de autenticación con JWT usando SimpleJWT.

Configuración de CORS con django-cors-headers.

Uso de variables de entorno mediante .env.

Despliegue con Render usando PostgreSQL.

✔ React + Vite

Routing con react-router-dom.

Creación de componentes funcionales.

Uso de hooks (useState, useEffect).

Manejo global de tokens mediante localStorage.

Protección de rutas con ProtectedRoute.

Manejo de peticiones HTTP con Axios.

✔ Axios Interceptors

Aprendiste a:

Adjuntar el token automáticamente en cada petición.

Detectar si un token está expirado (401).

Intentar refrescarlo automáticamente.

Redirigir al login si no es posible refrescarlo.

✔ Buenas prácticas

Mantener rutas backend en un solo archivo (api.js).

Usar variables de entorno para diferenciar desarrollo/producción.

Separar componentes reutilizables.

No subir .env al repositorio.

Usar Redirect/Rewrites en Render para SPA.

Colocar CORS y WhiteNoise correctamente en el backend.

🛠️ Instalación y ejecución en local
1️⃣ Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO

⚙️ Backend – Django
2️⃣ Crear entorno virtual
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows

3️⃣ Instalar dependencias
pip install -r requirements.txt

4️⃣ Crear archivo .env

En /backend/.env:

SECRET_KEY=tu-secret-key-local
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=             # vacío para usar SQLite en local

5️⃣ Aplicar migraciones
python manage.py migrate

6️⃣ Ejecutar servidor
python manage.py runserver


Backend corre en:

http://localhost:8000

💻 Frontend – React + Vite
7️⃣ Instalar dependencias
cd frontend
npm install

8️⃣ Crear variables de entorno
📄 .env.development
VITE_API_URL=http://localhost:8000/api

📄 .env.production

(NOTA: solo para referencia; Render las define en su panel)

VITE_API_URL=https://TU_BACKEND.onrender.com/api

9️⃣ Ejecutar frontend
npm run dev


Frontend corre en:

http://localhost:5173

🌐 Despliegue en Render
🚩 Backend

Crear Web Service en Render.

Variables requeridas:

SECRET_KEY=xxxxxxxx
DEBUG=False
ALLOWED_HOSTS=django-react-full-stack-v1.onrender.com
DATABASE_URL=postgresql://...


Render detecta Django y realiza el deploy.

Revisa que Rutas expuestas incluyan /api/....

🚩 Frontend

Crear Static Site en Render.

Comandos:

Build Command: npm run build
Publish Directory: dist


Variables de entorno:

VITE_API_URL=https://TU_BACKEND.onrender.com/api


Añadir Redirect/Rewrites:

Source	Destination	Type
/*	/index.html	Rewrite
🚀 Actualizar el proyecto cuando hagas cambios
Para subir cambios:
git add .
git commit -m "Descripción del cambio"
git push origin main

Para recibir cambios del repositorio remoto:
git pull

Render actualiza la app automáticamente si está configurado con GitHub.
