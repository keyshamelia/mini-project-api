-- Marketplace Digital Product - Database

CREATE DATABASE IF NOT EXISTS marketplace_db;
USE marketplace_db;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('buyer', 'seller') DEFAULT 'buyer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(200) NOT NULL,
  deskripsi TEXT,
  harga DECIMAL(10,2) NOT NULL DEFAULT 0,
  file_url VARCHAR(255),
  category_id INT,
  seller_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  total_harga DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Dummy Data
INSERT INTO categories (nama, deskripsi) VALUES
('E-Book', 'Buku digital dalam berbagai format'),
('Template', 'Template desain siap pakai'),
('Plugin & Tools', 'Plugin dan tools untuk developer'),
('Video Course', 'Video pembelajaran premium');

INSERT INTO users (nama, email, role) VALUES
('Keysha Amelia', 'keysha@email.com', 'seller'),
('Saputra Alea', 'saputra@email.com', 'seller'),
('Baskara Mahendra', 'baskara@email.com', 'buyer'),
('Andini Setya', 'andini@email.com', 'buyer'),
('Leroy Adam', 'leroy@email.com', 'buyer');

INSERT INTO products (nama, deskripsi, harga, file_url, category_id, seller_id) VALUES
('E-Book Belajar JavaScript', 'Panduan lengkap JS untuk pemula hingga mahir', 75000, 'https://storage.example.com/ebook-js.pdf', 1, 1),
('Template Dashboard Admin', 'Template HTML CSS siap pakai untuk admin panel', 150000, 'https://storage.example.com/template-admin.zip', 2, 1),
('E-Book Desain UI/UX', 'Prinsip desain UI UX yang wajib dikuasai', 99000, 'https://storage.example.com/ebook-uiux.pdf', 1, 2),
('Plugin SEO Optimizer', 'Plugin untuk optimasi SEO website WordPress', 200000, 'https://storage.example.com/seo-plugin.zip', 3, 2),
('Video Course React JS', 'Belajar React JS dari nol sampai bisa deploy', 350000, 'https://storage.example.com/course-react.zip', 4, 1);

INSERT INTO transactions (user_id, product_id, total_harga, status) VALUES
(3, 1, 75000, 'success'),
(3, 2, 150000, 'success'),
(4, 3, 99000, 'success'),
(4, 4, 200000, 'pending'),
(5, 5, 350000, 'success');

-- testing
select * FROM categories
select * FROM users
select * FROM products
select * FROM transactions