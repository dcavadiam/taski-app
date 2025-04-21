# Taski App

Taski es una aplicación web moderna para la gestión de tareas, construida con Next.js y TypeScript, siguiendo los principios de Feature-based + Atomic Design.

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/dcavadiam/taski-app.git
cd taski-app
```

2. Instala las dependencias:

```bash
pnpm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:

```bash
pnpm dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Arquitectura

La aplicación sigue una arquitectura moderna y escalable:

### Estructura del Proyecto

```
taski-app/
├── app/                 # Next.js App Router
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes atómicos y moleculares
│   ├── layout/         # Componentes de layout
│   └── providers/      # Proveedores de contexto
├── features/           # Módulos de características
│   ├── tasks/         # Feature de tareas
│   └── projects/      # Feature de proyectos
└── lib/               # Utilidades y configuraciones
```

### Tecnologías Principales

- **Frontend**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilado**: Tailwind CSS
- **UI Components**: ShadcnUI
- **Deployment**: Vercel

## 💡 Decisiones técnicas clave

1. **Arquitectura Feature-based + Atomic Design**:

   - Organización por características para mejor escalabilidad
   - Componentes atómicos reutilizables
   - Separación clara de responsabilidades

2. **Next.js App Router**:

   - Renderizado del lado del servidor optimizado
   - Enrutamiento basado en el sistema de archivos
   - Mejor rendimiento y SEO

3. **TypeScript**:

   - Seguridad de tipos
   - Mejor mantenibilidad del código
   - Autocompletado mejorado

4. **Tailwind CSS + ShadcnUI**:
   - Desarrollo rápido y consistente
   - Componentes UI accesibles y personalizables
   - Sistema de diseño coherente

## 🌐 Repositorio público

El código fuente está disponible en GitHub:
[https://github.com/dcavadiam/taski-app](https://github.com/dcavadiam/taski-app)

## 🚀 Deploy en Vercel

La aplicación está desplegada en Vercel.

URL de producción: [https://taski-app.vercel.app](https://taski-app.vercel.app)
