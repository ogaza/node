-- Active: 1779887476146@@127.0.0.1@5432@recipeguru

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR,
    type VARCHAR(50) CHECK (type IN ('admin', 'user'))
);

INSERT INTO
    users (username, password, type)
VALUES ('admin', '', 'admin');