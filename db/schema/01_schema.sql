DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS interests CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS markers CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) DEFAULT NULL
);

CREATE TABLE interests (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);


CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  interest_id INTEGER REFERENCES interests(id) NOT NULL,
  name VARCHAR(32) DEFAULT 'My Map',
  description TEXT,
  lat_start DECIMAL(8, 6) DEFAULT 0,
  lng_start DECIMAL(8, 6) DEFAULT 0,
  zoom INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT current_timestamp,
  last_edited TIMESTAMP DEFAULT current_timestamp
);


CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id),
  lat DECIMAL(8, 6) NOT NULL,
  lng DECIMAL(8, 6) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id),
  created_at TIMESTAMP DEFAULT current_timestamp
);

