# Marketplace Digital Product API

ini adalah project REST API sederhana untuk simulasi marketplace digital product. 
dibangun menggunakan Node.js dan Express.js, terhubung ke database MySQL.

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- nodemon
- Postman

## Struktur Folder
```
mini-pro-api/
├── config/
│   └── database.js
├── controllers/
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── models/
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── routes/
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── .env
├── .gitignore
├── app.js
├── database.sql
└── package.json
```

## Cara Jalanin Project

1. Clone repo ini
2. Jalanin `npm install`
3. Import `database.sql` ke MySQL kamu
4. Buat file `.env` isi sesuai database kamu:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=marketplace_db
DB_PORT=3306
```
5. Jalanin `npm run dev`
6. Server jalan di `http://localhost:3000`

## Endpoint API

### Users
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/users` | ambil semua user |
| GET | `/users/:id` | ambil user by ID |
| POST | `/users` | tambah user baru |
| PUT | `/users/:id` | update user |
| DELETE | `/users/:id` | hapus user |

### Categories
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/categories` | ambil semua kategori |
| GET | `/categories/:id` | ambil kategori by ID |
| POST | `/categories` | tambah kategori |
| PUT | `/categories/:id` | update kategori |
| DELETE | `/categories/:id` | hapus kategori |

### Products
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/products` | ambil semua produk |
| GET | `/products/:id` | ambil produk by ID |
| POST | `/products` | tambah produk |
| PUT | `/products/:id` | update produk |
| DELETE | `/products/:id` | hapus produk |
| GET | `/products-with-category` | produk lengkap sama kategori dan seller nya |

### Transactions
| Method | Endpoint | Keterangan |
|--------|----------|-----------|
| GET | `/transactions` | ambil semua transaksi |
| GET | `/transactions/:id` | ambil transaksi by ID |
| POST | `/transactions` | buat transaksi baru |
| PUT | `/transactions/:id` | update transaksi |
| DELETE | `/transactions/:id` | hapus transaksi |