DROP TABLE IF EXISTS activity;

CREATE TABLE activity (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL UNIQUE CHECK(length(name) > 0)
);

DROP TABLE IF EXISTS timeCard;

CREATE TABLE timeCard (
  id integer PRIMARY KEY AUTOINCREMENT,
  activity_id integer NOT NULL,
  activity_date text NOT NULL,
  duration integer NOT NULL,
  description text,
  FOREIGN KEY (activity_id) REFERENCES activity (id)
  ON DELETE CASCADE ON UPDATE NO ACTION
);
