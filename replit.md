# GifStuff - GIF Generation Application

## Overview

GifStuff is a modern web application that creates animated GIFs using various effects and generators. The application provides a user-friendly interface for generating GIFs with different animations (like pet-pet, money rain, pizza effects, etc.) and also includes QR code generation capabilities. It integrates with the GifStuffAPI service to process images and generate the final outputs.

## System Architecture

This is a full-stack application built with a **React frontend** and **Express.js backend** architecture:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but minimal schema)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **External API**: GifStuffAPI (gifstuffapi.com) for GIF and QR generation

The application follows a monorepo structure with clear separation between client, server, and shared code.

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Router**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Storage**: Currently using in-memory storage with interface for future database integration
- **Development**: Hot reloading with tsx and Vite middleware integration

### Key Features
1. **GIF Generation**: Multiple effect types (petpet, money, pizza, swirl, etc.)
2. **QR Code Generation**: URL to QR code conversion
3. **IP Address Checking**: Utility to check user's IP address
4. **Theme System**: Light/dark/system theme support with persistence
5. **Responsive Design**: Mobile-first approach with responsive layouts

## Data Flow

1. **User Input**: Users enter image URLs or other data through form inputs
2. **Validation**: Client-side validation ensures proper URL formats
3. **API Calls**: Frontend makes HTTP requests to external GifStuffAPI
4. **Processing**: External API processes the requests and returns generated content
5. **Display**: Results are displayed with options to copy URLs or download content
6. **State Management**: TanStack Query handles caching and state synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connection (Neon PostgreSQL)
- **drizzle-orm & drizzle-kit**: ORM and migration tools
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **tailwindcss**: Utility-first CSS framework
- **@replit/***: Replit-specific development tools

### External Services
- **GifStuffAPI** (gifstuffapi.com): Primary service for GIF and QR generation
- **Neon Database**: PostgreSQL hosting (configured via DATABASE_URL)

## Deployment Strategy

### Development
- **Dev Server**: `npm run dev` runs both frontend (Vite) and backend (tsx) with hot reloading
- **Database**: `npm run db:push` applies schema changes using Drizzle (optional - uses in-memory storage)
- **Type Checking**: `npm run check` validates TypeScript across the entire codebase

### Production Deployment Options

#### Option 1: VPS/Local Machine with PM2
- **Setup**: Run `chmod +x scripts/setup.sh && ./scripts/setup.sh` for automated setup
- **Process Manager**: PM2 handles process management, auto-restart, and logging
- **Port Configuration**: Uses PORT environment variable (default: 5000)
- **Monitoring**: `pm2 status`, `pm2 logs gifstuff` for monitoring

#### Option 2: Docker Deployment
- **Build**: `docker build -t gifstuff .` or use `docker-compose up -d`
- **Container**: Alpine Linux with Node.js 20 for minimal footprint
- **Health Checks**: Built-in health monitoring and auto-restart
- **Port Mapping**: Configurable port mapping for any environment

#### Option 3: Direct Node.js
- **Build**: `npm run build` creates production bundle
- **Start**: `npm start` runs the production server
- **Environment**: Configurable via PORT and NODE_ENV variables

### Configuration
- **Environment Variables**: 
  - `PORT`: Server port (default: 5000)
  - `NODE_ENV`: Environment mode (development/production)
- **Build Output**: Single dist directory containing both frontend and backend assets
- **Static Serving**: Express serves built frontend assets in production
- **No Database Required**: Uses in-memory storage, no external dependencies

## Changelog

```
Changelog:
- July 03, 2025: Initial setup with React frontend and Express backend
- July 03, 2025: Added GIF generation with 9 effects (petpet, money, pizza, swirl, dogecash, slap, catjam, burn, gun)
- July 03, 2025: Implemented QR code generator and IP checker
- July 03, 2025: Added dark/light/system theme switching with toggle button
- July 03, 2025: Created modal dialog for displaying generated content
- July 03, 2025: Fixed CORS issues with backend proxy routes
- July 03, 2025: Made application easily hostable with Docker, PM2, and VPS deployment options
- July 03, 2025: Added comprehensive deployment documentation and scripts
- July 03, 2025: Added Windows support with setup.bat and deploy.bat scripts
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```