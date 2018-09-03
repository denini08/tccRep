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
  PRIMARY KEY (id)
);

CREATE TABLE orientadores (
  id int(11) NOT NULL AUTO_INCREMENT,
  nome_orientador varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE trabalhos_orientadores (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_trabalho int(11),
  id_orientador int(11),
  PRIMARY KEY (id),
  FOREIGN KEY (id_trabalho) REFERENCES trabalhos(id),
  FOREIGN KEY (id_orientador) REFERENCES orientadores(id)
);