# UliGames Store - Frontend

Frontend de la tienda de videojuegos UliGames desarrollado con React, TypeScript y Vite.

## 🚀 Características

- **React 19** con TypeScript para tipado estático
- **Vite** como bundler para desarrollo rápido
- **React Router** para navegación
- **Context API** para estado global
- **Bootstrap** para UI responsive
- **Conexión con API real** usando servicios REST
- **Autenticación JWT** con persistencia local
- **Carrito de compras** con localStorage
- **Sistema de notificaciones** en tiempo real

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:5000`

## 🛠️ Instalación

1. **Instalar dependencias**
```bash
cd FRONT
npm install
```

2. **Configurar variables de entorno**
Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

## 🔗 Conexión con Backend

El frontend está configurado para conectarse con el backend en `http://localhost:5000/api`. Asegúrate de que:

1. **El backend esté corriendo** en el puerto 5000
2. **PostgreSQL esté configurado** con la base de datos `pw_2025_1`
3. **Las variables de entorno** del backend estén configuradas correctamente

### Servicios de API implementados:

- **Autenticación**: Login, registro, verificación de token
- **Juegos**: CRUD completo, filtros, búsqueda
- **Noticias**: Gestión de noticias del sitio
- **Usuarios**: Perfiles y gestión de usuarios
- **Órdenes**: Sistema de compras y códigos de juego

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Admin/          # Componentes del panel de administración
│   ├── Carousel/       # Componente de carrusel
│   ├── GameCard/       # Tarjeta de juego
│   ├── Layout/         # Layout principal
│   ├── Navbar/         # Barra de navegación
│   └── Notification/   # Sistema de notificaciones
├── config/             # Configuración de la aplicación
│   ├── api.ts         # Configuración de API
│   └── config.ts      # Configuración general
├── contexts/           # Contextos de React
│   ├── AuthContext.tsx # Contexto de autenticación
│   ├── CartContext.tsx # Contexto del carrito
│   └── NotificationContext.tsx # Contexto de notificaciones
├── hooks/              # Custom hooks
│   └── useGames.ts    # Hook para gestión de juegos
├── pages/              # Páginas de la aplicación
│   ├── Admin/         # Páginas de administración
│   ├── Home/          # Página principal
│   ├── Login/         # Página de login
│   ├── Register/      # Página de registro
│   └── ...            # Otras páginas
├── services/           # Servicios de API
│   └── api/           # Servicios específicos de API
├── types/              # Definiciones de tipos TypeScript
└── router/             # Configuración de rutas
```

## 🔐 Autenticación

El sistema de autenticación usa JWT tokens almacenados en localStorage:

- **Login**: `/login` - Inicio de sesión
- **Registro**: `/register` - Crear nueva cuenta
- **Protección de rutas**: Rutas privadas requieren autenticación
- **Persistencia**: El token se mantiene entre sesiones

## 🛒 Carrito de Compras

- **Almacenamiento local**: Los items se guardan en localStorage
- **Sincronización**: Se sincroniza con el backend al hacer checkout
- **Persistencia**: Los items se mantienen entre sesiones
- **Validación**: Verifica stock y disponibilidad

## 📱 Páginas Principales

- **Home** (`/`): Página principal con noticias y juegos destacados
- **Catálogo** (`/catalog`): Lista completa de juegos con filtros
- **Detalles de Juego** (`/game/:id`): Información detallada del juego
- **Carrito** (`/cart`): Gestión del carrito de compras
- **Login** (`/login`): Inicio de sesión
- **Registro** (`/register`): Crear cuenta nueva
- **Perfil** (`/profile`): Gestión del perfil de usuario

## 🎨 Estilos

- **CSS Modules**: Estilos modulares por componente
- **Bootstrap**: Framework CSS para responsive design
- **Variables CSS**: Sistema de variables para temas
- **Responsive**: Diseño adaptativo para móviles y desktop

## 🧪 Testing

```bash
npm test
```

## 📝 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build
- `npm run lint` - Ejecutar linter

## 🔧 Configuración de Desarrollo

El servidor de desarrollo se ejecuta en `http://localhost:3000`

Para desarrollo, asegúrate de que:
1. El backend esté corriendo en `http://localhost:5000`
2. La base de datos PostgreSQL esté configurada
3. Las variables de entorno estén correctamente configuradas

## 🚀 Despliegue

Para desplegar en producción:

1. **Construir el proyecto**:
```bash
npm run build
```

2. **Servir los archivos estáticos** desde la carpeta `dist/`

3. **Configurar el backend** para servir los archivos estáticos

## 📞 Soporte

Para problemas o preguntas:
1. Revisa los logs del navegador
2. Verifica la conexión con el backend
3. Asegúrate de que todas las dependencias estén instaladas
4. Contacta al equipo de desarrollo
