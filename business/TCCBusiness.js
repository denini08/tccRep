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
      }).catch((err) => {
        if(err.code == 'ER_DUP_ENTRY'){
          reject('Já existe um documento com esse ISBN');
        }else{
          reject(err);
        }
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
      if(!(req.campo && req.busca)) {
        reject('faltando paramentros')
      }
      
      switch(req.campo){
          case 'titulo':
            this.tccPersistor.searchTitulo(req.busca).then((res)=>{
              resolve(res);
            }).catch((err)=>{
              reject(err);
            })
            break;

          case 'isbn':
            this.tccPersistor.searchIsbn(req.busca).then((res)=>{
              resolve(res);
            }).catch((err)=>{
              reject(err);
            });
            break;

          case 'tema':
            this.tccPersistor.searchTema(req.busca).then((res)=>{
              resolve(res);
            }).catch((err)=>{
              reject(err);
            });
            break;

          case 'autor':
          this.tccPersistor.searchAutor(req.busca).then((res)=>{
            resolve(res);
          }).catch((err)=>{
            reject(err);
          });
            break;

          case 'curso':
          this.tccPersistor.searchCurso(req.busca).then((res)=>{
            resolve(res);
          }).catch((err)=>{
            reject(err);
          });
            break;

          case 'orientador':
          this.tccPersistor.orientador(req.busca).then((res)=>{
            resolve(res);
          }).catch((err)=>{
            reject(err);
          });
            break;

          case 'ano':
          this.tccPersistor.ano(req.busca).then((res)=>{
            console.log("ANOOOOOO")
            resolve(res);
          }).catch((err)=>{
            reject(err);
          });
            break;
            
          default:
            reject('parametro nao inserido');
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
