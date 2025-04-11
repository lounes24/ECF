CREATE TABLE `USERS` (
  `users_id` INTEGER PRIMARY KEY,
  `email` TEXT,
  `password` TEXT,
  `role` TEXT CHECK(role IN ('admin', 'user'))  -- Ajout d'une contrainte CHECK pour le role
);

CREATE TABLE `SERIES` (
  `series_id` INTEGER PRIMARY KEY,
  `title` TEXT,
  `gender` TEXT,
  `release_date` DATE
);

CREATE TABLE `PLATFORMS` (
  `platforms_id` INTEGER PRIMARY KEY,
  `name` TEXT,
  `type` TEXT
);

CREATE TABLE `DISPONIBILITE` (
  `series_id` INTEGER,
  `platforms_id` INTEGER,
  `date_ajout` DATE,
  PRIMARY KEY (`series_id`, `platforms_id`),
  FOREIGN KEY (`series_id`) REFERENCES `SERIES` (`series_id`),
  FOREIGN KEY (`platforms_id`) REFERENCES `PLATFORMS` (`platforms_id`)
);

CREATE TABLE `USERS_SERIES` (
  `users_id` INTEGER,
  `series_id` INTEGER,
  PRIMARY KEY (`users_id`, `series_id`),
  FOREIGN KEY (`users_id`) REFERENCES `USERS` (`users_id`),
  FOREIGN KEY (`series_id`) REFERENCES `SERIES` (`series_id`)
);





