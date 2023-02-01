CREATE TABLE if NOT EXISTS movies (
 "id" SERIAL PRIMARY KEY,
 "name" VARCHAR(50) UNIQUE NOT NULL,
 "description" TEXT,
 "duration" INTEGER NOT NULL,
 "price" INTEGER CHECK("price" > 0) NOT NULL
);