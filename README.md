Tes Internship Fumindo: Asset Management

Aplikasi CRUD data asset menggunakan PostgreSQL, NestJS (TypeORM), dan Vue.js (Axios, Tailwind CSS).

Cara Menjalankan

1. Database

Buat database `asset_fumindo`, lalu jalankan `CREATE TABLE` dari file `database.sql`.

**2. Backend** (sesuaikan password database di `asset-api/src/app.module.ts`)

**3. Frontend**

```bash
cd asset-web
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Endpoint API

| Method | Endpoint     |
|--------|--------------|
| GET    | `/asset`     |
| GET    | `/asset/:id` |
| POST   | `/asset`     |
| PATCH  | `/asset/:id` |
| DELETE | `/asset/:id` |
