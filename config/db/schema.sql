CREATE DATABASE games_db;
USE games_db;

CREATE TABLE games
(
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  developer VARCHAR(255) NOT NULL,
  platform VARCHAR(255) NOT NULL,
  releasedate DATE NOT NULL,
  agerating INTEGER NOT NULL,

  
  PRIMARY KEY (id)
);


CREATE DATABASE gamesstatus_db;
USE gamesstatus_db;

CREATE TABLE STATUS(
  id int NOT NULL AUTO_INCREMENT,

)