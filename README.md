# PWEB EXPRESS P17 2025 - Bookstore API

| Nama                        | NRP        |
| --------------------------- | ---------- |
| Hansen Chang                | 5027241028 |
| Ivan Syarifuddin            | 5027241045 |
| Muhammad Khosyi Syehab      | 5027241089 |

> Menggunakan **Express.js**, **Tyescript**, **Prisma ORM**, dan **PostgreSQL**

---
## Deskripsi Singkat
Proyek ini adalah implementasi RESTful API berbasis **Express.js + Prisma** untuk sistem manajemen toko buku.

---
## Struktur Database
```
users {
id uuid [pk]
username text
password text [not null]
email text [not null, unique]
created_at datetime [not null]
updated_at datetime [not null]
}
```
```
genres {
id uuid [pk]
name text [not null, unique]
created_at datetime [not null]
updated_at datetime [not null]
deleted_at datetime
}
```
```
books {
id uuid [pk]
title text [not null, unique]
writer text [not null]
publisher text [not null]
publication_year int [not null]
description text
price number [not null]
stock_quantity int [not null]
genre_id uuid [ref: > genres.id, not null]
created_at datetime [not null]
updated_at datetime [not null]
deleted_at datetime
}
```
```
orders {
id uuid [pk]
user_id uuid [ref: > users.id, not null]
created_at datetime [not null]
updated_at datetime [not null]
}
```
```
order_items {
id uuid [pk]
quantity int [not null]
order_id uuid [ref: > orders.id, not null]
book_id uuid [ref: > books.id, not null]
created_at datetime [not null]
updated_at datetime [not null]
}
```

---
## Sturktur Direktori
```
pweb-express-p17-2025/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── config/
│ │ └── prisma.ts
│ ├── controllers/
│ │ ├── authController.ts
│ │ ├── bookController.ts
│ │ ├── genreController.ts
│ │ ├── orderController.ts
│ │ ├── orderItemController.ts
│ │ └── statisticsController.ts
│ ├── middlewares/
│ │ └── authMiddleware.ts
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ ├── bookRoutes.ts
│ │ ├── genreRoutes.ts
│ │ ├── orderRoutes.ts
│ │ ├── orderItemRoutes.ts
│ │ └── statisticsRoutes.ts
│ └── index.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---
## Running Program
### **1. Clone Repository**
```
git clone https://github.com/IvanSyrfdn/pweb-express-p17-2025.git
cd pweb-express-p17-2025
```
### **2. NPM Dependencies Install**
```
npm install
```
### **3. Konfigurasi Env + Setup Server**
3.1 Buat file .env di root folder (gunakan URL dari NeonDB)
```
DATABASE_URL="postgresql://<your_connection_string>"
JWT_SECRET="supersecretjwtkey123"
PORT=4000
```
3.2 Push Schema ke DB
```
npx prisma db push
```
3.3 Seeding (Opsional fren)
```
npx ts-node prisma/node.ts
```
3.4 Jalankan Server
```
npm run dev
```

---
## Testing API (Postman / Insomnia)
File dokumentasi API:
https://drive.google.com/file/d/1stezcLxd9C1Uc-oZfEx3hT18S2aUbzoS/view?usp=sharing

## Demo Prisma Studio
```
npx prisma studio
```
