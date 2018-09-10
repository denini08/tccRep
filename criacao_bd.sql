create database tcc;

CREATE TABLE Trabalhos (
  id int(11) NOT NULL AUTO_INCREMENT,
  titulo varchar(150) DEFAULT NULL,
  tema varchar(150) DEFAULT NULL,
  autor varchar(100) DEFAULT NULL,
  curso varchar(100) DEFAULT NULL,
  ano int(11) DEFAULT NULL,
  semestre int(11) DEFAULT NULL,
  pdf varchar(100) DEFAULT NULL,
  orientadores varchar(150) DEFAULT NULL,
  coorientadores varchar(150) DEFAULT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE admins (
    id int(11) NOT NULL AUTO_INCREMENT,
    nome varchar(150) DEFAULT NULL,
    login varchar(13) NOT NULL,
    senha varchar(150) NOT NULL,
    PRIMARY KEY (id)
);

insert into admins(nome, login, senha) values ('O grande rei', 'admin', '123');