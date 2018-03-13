CREATE TABLE activity (
id integer PRIMARY KEY,
name text);

INSERT INTO activity VALUES (1, "Program");
INSERT INTO activity VALUES (2, "Guitar");
INSERT INTO activity VALUES (3, "Game");

CREATE TABLE timeCard (
id integer PRIMARY KEY,
activity_id integer,
activity_date text,
duration integer,
description text,
FOREIGN KEY (activity_id) REFERENCES activity (id)
ON DELETE CASCADE ON UPDATE NO ACTION);

INSERT INTO timeCard VALUES (1, 2, "2/28/2018", 60, "Learned travis picking.");
INSERT INTO timeCard VALUES (2, 1, "2/28/2018", 30, "Made this database.");
