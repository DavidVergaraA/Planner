# Aventuras de Bienestar - Planner de Hábitos Gamificado

Este monorepo contiene un proyecto **full stack** basado en React (Vite) para el frontend, Express para el backend y MySQL como base de datos. La aplicación sigue un enfoque **MVC** en el servidor y está inspirada en mecánicas RPG para reforzar la formación de hábitos saludables.

## Estructura del proyecto

```
Planner/
├── backend/          # API Express organizada en capas (config, modelos, controladores y rutas)
│   ├── database/     # Scripts SQL para inicializar el esquema
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── utils/
└── frontend/         # Interfaz React con Vite y componentes reutilizables
    └── src/
        ├── components/
        ├── hooks/
        ├── services/
        └── styles/
```

## Backend (Express + MySQL)

- MVC con modelos que interactúan con MySQL usando `mysql2/promise` y una capa de utilidades para consultas.
- Controladores gestionan la lógica de hábitos, progreso gamificado, badges e información de la mascota virtual **Lumi**.
- Rutas con validaciones usando `express-validator` y middlewares para inyectar un usuario predeterminado (ideal para demos).
- Seguridad básica con `helmet`, `cors` y logging con `morgan`.

### Variables de entorno

Duplica el archivo `.env.example` y actualiza los valores según tu entorno.

```
cp backend/.env.example backend/.env
```

### Scripts disponibles

Desde `backend/`:

- `npm run start` – ejecuta el servidor en modo producción.
- `npm run dev` – levanta el servidor con `nodemon` y recarga automática.

### Inicializar la base de datos

1. Crea la base con el script incluido:

   ```sql
   SOURCE backend/database/schema.sql;
   ```

2. Opcional: ajusta usuarios/contraseñas y asigna privilegios en tu instancia MySQL.

## Frontend (React + Vite)

La interfaz muestra el tablero con hábitos activos, progreso general, insignias y el estado de la mascota. Incluye componentes especializados para formularios y paneles de progreso.

### Scripts disponibles

Desde `frontend/`:

- `npm run dev` – inicia Vite en modo desarrollo (puerto 5173).
- `npm run build` – crea el build de producción.
- `npm run preview` – sirve el build generado.

El `vite.config.js` incluye un proxy a `http://localhost:4000/api`, por lo que basta con ejecutar el backend en ese puerto durante el desarrollo.

## Flujo de desarrollo sugerido

1. Instala dependencias en ambos paquetes (`npm install` en `backend/` y `frontend/`).
2. Levanta MySQL y ejecuta el script `backend/database/schema.sql` para crear tablas y datos base.
3. Arranca el backend (`npm run dev`).
4. En otro terminal ejecuta el frontend (`npm run dev`).
5. Abre `http://localhost:5173` y comienza a registrar hábitos, recibir XP y ver crecer a Lumi.

## Psicología del juego aplicada

- **Recompensas inmediatas**: completar un hábito otorga XP y alimenta a la mascota.
- **Progresión visible**: niveles, barra de progreso y objetivos diarios.
- **Metas narrativas**: badges temáticos y un compañero virtual que evoluciona con tu constancia.

¡Listo! Ya tienes una base sólida para seguir expandiendo tu planner de hábitos gamificado.
