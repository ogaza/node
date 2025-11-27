-- Active: 1762168727075@@127.0.0.1@5432@recipeguru
DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS recipes_photos;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;

CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50 ) CHECK (type IN ('meat','fruit','vegetable','other')),
  image VARCHAR(255)
);
CREATE TABLE
  recipes (
    recipe_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) UNIQUE NOT NULL,
    body TEXT
  );
CREATE TABLE
  recipes_photos (
    photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    url VARCHAR(255) NOT NULL,
    recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE
  );
CREATE TABLE
  recipe_ingredients (
    recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE NO ACTION,
    ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE NO ACTION,
    CONSTRAINT
      recipe_ingredients_pk
    PRIMARY KEY (recipe_id, ingredient_id)
  );

INSERT INTO
  recipes(title, body)
VALUES
  ('Cookies', 'very yummy'),
  ('Empanada','ugh so good');

INSERT INTO
  ingredients(title, type, image)
VALUES
  ('butter', 'other', 'butter.jpg'),
  ('baking powder', 'other', 'baking_powder.jpg'),
  ('egg', 'other', 'egg.jpg'),
  ('brown sugar', 'other', 'brown.jpg'),
  ('vanilla', 'other', 'vanilla.jpg');

INSERT INTO
  recipes_photos(recipe_id, url)
VALUES
  (1, 'cookies1.jpg'),
  (1, 'cookies2.jpg'),
  (1, 'cookies3.jpg'),
  (1, 'cookies4.jpg'),
  (1, 'cookies5.jpg'),
  (2, 'empanada1.jpg'),
  (2, 'empanada2.jpg');

INSERT INTO
  recipe_ingredients(recipe_id, ingredient_id)
VALUES
  (1,1);