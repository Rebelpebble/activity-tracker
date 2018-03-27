DROP TABLE IF EXISTS activity;

CREATE TABLE activity (
  id integer PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL,
  name text NOT NULL CHECK(length(name) > 0),
  CONSTRAINT activity_name_unique UNIQUE (user_id, name),
  FOREIGN KEY (user_id) REFERENCES user (id)
    ON DELETE CASCADE ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS timeCard;

CREATE TABLE timeCard (
  id integer PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL,
  activity_id integer NOT NULL,
  activity_date text NOT NULL,
  duration integer NOT NULL,
  description text,
  FOREIGN KEY (activity_id) REFERENCES activity (id)
    ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (user_id) REFERENCES user (id)
    ON DELETE CASCADE ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id integer PRIMARY KEY AUTOINCREMENT,
  username text NOT NULL UNIQUE CHECK(length(username) > 0),
  password text NOT NULL CHECK(length(password) >= 6)
);

DROP TABLE IF EXISTS session;

CREATE TABLE session (
  user_id integer NOT NULL,
  token text NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
    ON DELETE CASCADE ON UPDATE NO ACTION
);
