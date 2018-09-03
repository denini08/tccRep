create database tcc;

CREATE TABLE Trabalhos (
  id int(11) NOT NULL AUTO_INCREMENT,
  isbn varchar(13) NOT NULL,
  titulo varchar(150) DEFAULT NULL,
  tema varchar(150) DEFAULT NULL,
  autor varchar(100) DEFAULT NULL,
  curso varchar(100) DEFAULT NULL,
  ano int(11) DEFAULT NULL,
  semestre int(11) DEFAULT NULL,
  orientadores varchar(150) DEFAULT NULL,
  PRIMARY KEY (id)
);