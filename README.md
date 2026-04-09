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
├── config/ [koneksi database nya]
│   └── database.js
├── controllers/ [ini tuhh sebenernya server yang bakal muncul pas kita demo di postman]
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── models/ [isinya script koneksi ke database sql]
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── routes/ [berisi semua endpoint dan request di postman]
│   ├── categories.js
│   ├── products.js
│   ├── transactions.js
│   └── users.js
├── .env
├── .gitignore
├── app.js [nah disini tuh isi dari semua server di mulai, dan memanggil semua nya disini]
├── database.sql [tapi kalau mau bikin entitas baru ya harus bikin table dulu di SQL nya baru di bungkus]
└── package.json [isinya library semua yang sudah di install npm run dev untuk menjalankan node.js]
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