const conn = require('./ConnectionDB.js');
const ATRIBUTOS = ' isbn, titulo, tema, autor, curso, ano, orientadores '


class TCCPersistence {
  constructor() {
    this.connection = conn;
  }
  insert(isbn, titulo, tema, autor, curso, ano, semestre, orientadores) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Trabalhos (isbn, titulo, tema, autor, curso, ano, semestre, orientadores) VALUES ? ';
      const values = [[isbn, titulo, tema, autor, curso, ano, semestre, orientadores]];
      this.connection.query(sql, [values], (err, result) => {
        if (err) reject(err);
        resolve(result);
    });
  })
}

  delete(isbn) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM trabalhos WHERE isbn='" + isbn + "';";
      this.connection.query(sql, (err, result) => {
      console.log(sql);
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchIsbn(isbn) {
    const sql = "SELECT * FROM trabalhos WHERE isbn = ?;";
    return new Promise((resolve, reject) => {
      this.connection.query(sql,[isbn], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchTitulo(titulo) {
    const sql = "SELECT" +ATRIBUTOS+ "FROM trabalhos WHERE titulo LIKE ?;";
    const value = "%" + titulo + "%";

    return new Promise((resolve, reject) => {
      this.connection.query(sql,[value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchAutor(autor) {
    const sql = "SELECT" + ATRIBUTOS +"FROM trabalhos WHERE autor LIKE ?;";
    const value = "%" + autor + "%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql,[value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchTema(tema) {
    const sql = "SELECT" + ATRIBUTOS + " FROM trabalhos WHERE tema LIKE ?;";
    const value = "%" + tema + "%";

    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchCurso(curso) {
    const sql = "SELECT" + ATRIBUTOS +" FROM trabalhos WHERE curso LIKE ? ;";
    const value = "%" +curso +"%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql,[value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchAno(ano) {
    const sql = "SELECT" + ATRIBUTOS+ "FROM trabalhos WHERE ano = ?;";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [ano], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchOrientador(orientador){
    const sql = "SELECT" + ATRIBUTOS + "FROM trabalhos WHERE Orientadores LIKE ?;"
    const value = "%" +orientador + "%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  searchGeneralista(query) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

}

module.exports = TCCPersistence;
