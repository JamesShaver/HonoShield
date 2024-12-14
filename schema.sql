DROP TABLE IF EXISTS users;
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
fistName TEXT NOT NULL,
lastName TEXT NOT NULL,
company TEXT NOT NULL,
username TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
status INTEGER NOT NULL,
status_message TEXT,
secret_key TEXT,
created_on datetime default current_timestamp,
updated_on datetime default current_timestamp
);
INSERT INTO users (fistName, lastName, company, username, password, status) VALUES ('James','Shaver','HonoShield','admin@honoshield.com','$2y$10$shvcobnqwtVxjPdZq2U2/OZt2hECWKJjShLK4Vyx0eBO2TNUWR3na', 1);