IF TABLE users DROP TABLE users CASCADE;
IF TABLE maps DROP TABLE maps CASCADE;
IF TABLE markers DROP TABLE markers CASCADE;
IF TABLE interests DROP TABLE interests CASCADE;
IF TABLE favourites DROP TABLE interests CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) DEFAULT NULL
);

CREATE TABLE interests (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
);

CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFRENCES maps(id),
  x_coordinate DECIMAL(8, 6) NOT NULL,
  y_coordinate DECIMAL(8, 6) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP
);

CREATE TABLE maps (
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  interest_id INTEGER REFERENCES interests(id) NOT NULL,
  name VARCHAR(32) DEFAULT 'My Map',
  created_at TIMESTAMP,
  last_edited TIMESTAMP
);

CREATE TABLE favourites (
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id),
  created_at TIMESTAMP
);

