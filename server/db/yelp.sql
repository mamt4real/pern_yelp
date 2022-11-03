/* Creating the database */
CREATE DATABASE pernyelp;

/* Connecting to the database */
\c pernyelp

/* Creating restaurant table */
CREATE TABLE restaurants (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	location VARCHAR(50) NOT NULL,
	price_range INTEGER NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

/* Sample data to initialize */
INSERT INTO restaurants(name, location, price_range) VALUES ('Wadata Food Palace', 'Kofar Doka Zaria', 3);
INSERT INTO restaurants(name, location, price_range) VALUES ('Usmaniyya Foods', 'Filin Mallawa', 3);
INSERT INTO restaurants(name, location, price_range) VALUES ('Shagalinku restaurants', 'Gwargwaje Zaria', 5);

/* Review Table */
CREATE TABLE reviews (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	review TEXT NOT NULL,
	rating INTEGER NOT NULL CHECK(rating <= 5 AND rating >= 1),
	rest_id BIGSERIAL NOT NULL,
	CONSTRAINT reveiew_rest_fkey FOREIGN KEY (rest_id) REFERENCES restaurants(id)
);

/* Review Examples */
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('mahadi', 'This is a nice food!!', 3, 1);
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('lawwal', 'This food is not bad', 2, 1);
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('sani', 'I have had better', 1, 1);
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('mahadi', 'This is a nice food!!', 3, 2);
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('lawwal', 'This food is not bad', 2, 2);
INSERT INTO reviews (name, review, rating, rest_id) VALUES ('salisu', 'the best so far! keep up', 5, 2);