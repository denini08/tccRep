const conn = require('./ConnectionDB.js');
const stream = require('stream');
const api = require('../googleAPI/GoogleDrive');
const ATRIBUTOS = ' titulo, tema, autor, curso, ano, orientadores '


class TCCPersistence {
  constructor() {
    this.connection = conn;
  }
  insert(titulo, tema, autor, curso, ano, semestre, orientador, palavras_chave, coorientador, idPdf) {
    // console.log('autor: ' + autor)
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Trabalhos ( titulo, tema, autor, curso, ano, semestre, orientadores, coorientadores, palavras_chave, pdf) VALUES ? ';
      const values = [[titulo, tema, autor, curso, ano, semestre, orientador, coorientador, palavras_chave, idPdf ]];
      this.connection.query(sql, [values], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    })
  }

  insertPdf(sampleFile) {

    return new Promise((resolve, reject) => {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(new Buffer(sampleFile.data));
      api.uploadFile(sampleFile.name, bufferStream).then((id) => { //enviando para o drive
        resolve(id)   //retonando o id do pdfs
      }).catch((err) => {
        reject(err)
      })
    })


  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM trabalhos WHERE id='" + id + "';";
      this.connection.query(sql, (err, result) => {
        console.log(sql);
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchId(id) {
    const sql = "SELECT * FROM trabalhos WHERE id = ?;";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [id], (err, result) => {
        if (err) reject(err);
        console.log(result);
        resolve(result);
      });
    });
  }

  searchTitulo(titulo) {
    const sql = "SELECT" + ATRIBUTOS + "FROM trabalhos WHERE titulo LIKE ?;";
    const value = "%" + titulo + "%";

    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchAutor(autor) {
    const sql = "SELECT" + ATRIBUTOS + "FROM trabalhos WHERE autor LIKE ?;";
    const value = "%" + autor + "%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
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
    const sql = "SELECT" + ATRIBUTOS + " FROM trabalhos WHERE curso LIKE ? ;";
    const value = "%" + curso + "%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchAno(ano) {
    const sql = "SELECT" + ATRIBUTOS + "FROM trabalhos WHERE ano = ?;";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [ano], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  searchOrientador(orientador) {
    const sql = "SELECT" + ATRIBUTOS + "FROM trabalhos WHERE Orientadores LIKE ?;"
    const value = "%" + orientador + "%";
    return new Promise((resolve, reject) => {
      this.connection.query(sql, [value], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  //ADMINS

  login(login,senha){
    const sql = "SELECT * FROM ADMINS WHERE login LIKE ? AND senha LIKE ?;"
    return new Promise((resolve, reject) =>{
      this.connection.query(sql,[login, senha], (err,result) =>{
          if(result[0]){
            //console.log(result[0])
            resolve(result[0])
          }else{
            reject('usuario ou senha invalidos')
          }
      })
    })
  }
  
  
  //GERAL
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
