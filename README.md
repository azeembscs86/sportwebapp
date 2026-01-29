# SportWebApp Backend

Production-ready Node.js + Express backend built with JavaScript, MySQL, and Redis.

## Features
- Express API with a clean folder structure.
- MySQL connection pooling and Redis client setup.
- Centralized error handling and request validation (Zod).
- Structured logging with Morgan + custom logger.
- `/health` endpoint for dependency checks.

## Prerequisites
- Node.js 18+
- Docker + Docker Compose

## Setup
1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Start MySQL + Redis:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the API in development:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000` by default.

## Endpoints
- `GET /health` — dependency health check.
- `POST /api/echo` — validates `{ "message": "..." }` and echoes the payload.
- `GET /api/banners` — list all banners.
- `GET /api/banners/online` — list online banners.
- `GET /api/banners/:bannerId` — fetch a banner by id.
- `POST /api/banners` — create a banner with `{ "bannerUrl": "https://...", "isOnline": true }`.
- `PUT /api/banners/:bannerId` — update a banner.
- `DELETE /api/banners/:bannerId` — delete a banner.

## Production build
```bash
npm run build
npm start
```
