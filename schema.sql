DROP TABLE IF EXISTS activity;

CREATE TABLE activity (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL UNIQUE CHECK(length(name) > 0)
);

DROP TABLE IF EXISTS timeCard;

CREATE TABLE timeCard (
  id integer PRIMARY KEY AUTOINCREMENT,
  activity_id integer,
  activity_date text,
  duration integer,
  description text,
  FOREIGN KEY (activity_id) REFERENCES activity (id)
  ON DELETE CASCADE ON UPDATE NO ACTION
);
