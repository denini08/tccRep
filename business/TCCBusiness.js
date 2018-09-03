/* eslint-disable no-console */

const TccRep = require('../persistence/TCCPersistence.js');

class TCCBusiness {
  constructor() {
    this.tccPersistor = new TccRep(); /* Não sei se isso seria o melhor a se fazer levando em
                                    consideração a arquitetura de camadas */
  }

  insertTcc(isbn, titulo, tema, autor, curso, ano, semestre, orientadores) {
    return new Promise((resolve, reject) => {
      this.tccPersistor.insert(isbn, titulo, tema, autor, curso, ano, semestre, orientadores).then((res) => {
        resolve(res);
      }).catch((res) => {
        reject(res);
      });
    });
  }

  deleteTcc(isbn) {
    return new Promise((resolve, reject) => {
      this.tccPersistor.delete(isbn).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  
  searchTccByIsbn(isbn) {
    return new Promise((resolve, reject) => {
      this.tccPersistor.searchIsbn(isbn).then((res) => {
        resolve(res);
      }).catch((res) => {
        reject(res);
      });
    });
  }

  searchTcc(req){
    return new Promise((resolve,reject)=>{
      if(req.titulo){

      }else if(true){

      }
    })
  }
}  
  
  /*
    return new Promise((resolve, reject) => {
      this.tccPersistor.searchGeneralista(sql).then((res) => {
      resolve(res);
    }).catch((res) => {
      reject(res);
    });
  });
  }*/


module.exports = TCCBusiness;
