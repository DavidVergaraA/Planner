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

El archivo `.env` debe permanecer dentro de la carpeta `backend/` (es el que lee Express al arrancar). Los campos que debes completar son:

| Variable       | Descripción                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `PORT`         | Puerto del servidor Express. Puedes dejar `4000` salvo que ya esté en uso.                                                 |
| `DB_HOST`      | Host de MySQL. Para instalaciones locales suele ser `localhost` o `127.0.0.1`.                                             |
| `DB_PORT`      | Puerto de MySQL. El valor por defecto en Community Server es `3306`.                                                       |
| `DB_USER`      | Usuario con permisos sobre la base `planner_db`. Puede ser tu usuario MySQL existente o uno nuevo creado para la app.      |
| `DB_PASSWORD`  | Contraseña del usuario indicado arriba.                                                                                    |
| `DB_NAME`      | Nombre de la base de datos que crearás con `schema.sql` (`planner_db` en el ejemplo).                                      |

#### ¿Cómo conocer o crear mis credenciales de MySQL?

1. **Si ya usas MySQL**: ingresa a tu consola o cliente preferido con tu usuario actual (por ejemplo `mysql -u root -p`) y reutiliza esas credenciales en el `.env`.
2. **Para crear un usuario dedicado** (recomendado):

   ```sql
   CREATE USER 'planner_user'@'localhost' IDENTIFIED BY 'una_contraseña_segura';
   GRANT ALL PRIVILEGES ON planner_db.* TO 'planner_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

   Cambia la contraseña por una propia. Si tu servidor no está en la misma máquina, reemplaza `'localhost'` por el host que corresponda.

3. Anota el usuario y la contraseña que utilices y colócalos en las variables `DB_USER` y `DB_PASSWORD` del `.env`.

> 💡 Tip: si instalaste MySQL Community recientemente, el instalador te obliga a definir la contraseña del usuario `root`. Puedes usar esa combinación (`root` + la contraseña que elegiste) para completar las variables, o crear el usuario dedicado mostrado arriba.

### Scripts disponibles

Desde `backend/`:

- `npm run start` – ejecuta el servidor en modo producción.
- `npm run dev` – levanta el servidor con `nodemon` y recarga automática.

### Levantar MySQL e inicializar la base de datos

1. **Inicia el servidor MySQL** según tu sistema operativo:

   - **Windows**: abre _MySQL Notifier_ o ejecuta `net start MySQL80` (cambia el nombre del servicio si usaste otro durante la instalación).
   - **macOS (Homebrew)**: `brew services start mysql`.
   - **Linux (systemd)**: `sudo systemctl start mysql` o `sudo systemctl start mysqld`, dependiendo de la distro.

   Puedes comprobar que está activo con `mysqladmin ping -u root -p` (sustituye el usuario si usas otro).

2. **Ejecuta el script `schema.sql` dentro del cliente MySQL**. Desde una terminal, navega al directorio del proyecto y abre la consola de MySQL con tu usuario:

   ```bash
   cd /ruta/al/proyecto/Planner
   mysql -u planner_user -p
   ```

   Una vez dentro del prompt interactivo de MySQL (`mysql>`), lanza el script con la ruta relativa o absoluta al archivo:

   ```sql
   SOURCE backend/database/schema.sql;
   ```

   > También puedes ejecutarlo sin entrar al prompt interactivo: `mysql -u planner_user -p < backend/database/schema.sql`.

3. Opcional: ajusta usuarios/contraseñas y asigna privilegios en tu instancia MySQL.

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
