SET client_min_messages = warning;
-- -------------------------
-- -------------------------
-- Table users
-- -------------------------
DROP TABLE IF EXISTS users;
--
--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATE
);
-- -------------------------
-- Table emails
-- -------------------------
DROP TABLE IF EXISTS emails;
--
--
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table phones
-- -------------------------
DROP TABLE IF EXISTS phones;
--
--
CREATE TABLE IF NOT EXISTS phones (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(30) UNIQUE NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table passwords
-- -------------------------
DROP TABLE IF EXISTS passwords;
--
--
CREATE TABLE IF NOT EXISTS passwords (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -------------------------
-- Table profile_pictures
-- -------------------------
DROP TABLE IF EXISTS profile_pictures;
--
--
CREATE TABLE IF NOT EXISTS profile_pictures (
    id SERIAL PRIMARY KEY,
    profile_url TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- -------------------------
-- Table categories
-- -------------------------
DROP TABLE IF EXISTS categories;
--
--
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table issues
-- -------------------------
DROP TABLE IF EXISTS issues;
--
--
CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id),
    reproducibility TEXT NOT NULL,
    severity INT NOT NULL,
    priority INT NOT NULL,
    summary TEXT NOT NULL,
    issue_desc TEXT NOT NULL,
    view_status INT NOT NULL,
    issue_status INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at DATE,
    deleted_at DATE,
    user_id INT NOT NULL REFERENCES users(id)
);
-- -------------------------
-- Table notes
-- -------------------------
DROP TABLE IF EXISTS notes;
--
--
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    note TEXT,
    user_id INT NOT NULL REFERENCES users(id),
    issue_id INT NOT NULL REFERENCES issues(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table images
-- -------------------------
DROP TABLE IF EXISTS images;
--
--
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL
);
-- -------------------------
-- Table note_images
-- -------------------------
DROP TABLE IF EXISTS note_images;
--
--
CREATE TABLE IF NOT EXISTS note_images (
    note_id INT NOT NULL REFERENCES notes(id),
    image_id INT NOT NULL REFERENCES images(id),
    PRIMARY KEY (note_id, image_id)
);
-- -------------------------
-- Table issue_images
-- -------------------------
DROP TABLE IF EXISTS issue_images;
--
--
CREATE TABLE IF NOT EXISTS issue_images (
    issue_id INT NOT NULL REFERENCES notes(id),
    image_id INT NOT NULL REFERENCES images(id),
    PRIMARY KEY (issue_id, image_id)
);