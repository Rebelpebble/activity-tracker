INSERT INTO user (id, username, password) VALUES (1, "brianneas", "password");
INSERT INTO user (id, username, password) VALUES (2, "treythomas", "hunter2");

INSERT INTO activity (id, user_id, name) VALUES (1, 1, "Program");
INSERT INTO activity (id, user_id, name) VALUES (2, 1, "Guitar");
INSERT INTO activity (id, user_id, name) VALUES (3, 1, "Game");
INSERT INTO activity (id, user_id, name) VALUES (4, 2, "Snowboard");
INSERT INTO activity (id, user_id, name) VALUES (5, 2, "Program");
INSERT INTO activity (id, user_id, name) VALUES (6, 2, "Getting Nuked");

INSERT INTO timeCard (id, user_id, activity_id, activity_date, duration, description)
  VALUES (1, 1, 2, "2018-03-26", 60, "Learned travis picking.");
INSERT INTO timeCard (id, user_id, activity_id, activity_date, duration, description)
  VALUES (2, 2, 6, "2018-03-26", 30, "I admitted defeat to Brian.");
