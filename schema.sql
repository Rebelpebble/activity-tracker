CREATE TABLE activity (
id integer PRIMARY KEY AUTOINCREMENT,
name text UNIQUE);

CREATE TABLE timeCard (
id integer PRIMARY KEY AUTOINCREMENT,
activity_id integer,
activity_date text,
duration integer,
description text,
FOREIGN KEY (activity_id) REFERENCES activity (id)
ON DELETE CASCADE ON UPDATE NO ACTION);
