/* eslint-disable no-console */

const TccRep = require('../persistence/TCCPersistence.js');

class TCCBusiness {
  constructor() {
    this.tccPersistor = new TccRep(); /* Não sei se isso seria o melhor a se fazer levando em
                                    consideração a arquitetura de camadas */
  }

  insertTcc(titulo, tema, palavras_chave, autor, orientadores1, orientadores2, orientadores3, coorientador1, coorientador2, coorientador3, curso, ano, semestre) {
    return new Promise((resolve, reject) => {
      //console.log('autor: ' + autor)
      let orientador = orientadores1 + " "+ orientadores2 + " "+ orientadores3;
      let coorientador = coorientador1 + " "+ coorientador2 + " " +coorientador3;

      this.tccPersistor.insert(titulo, tema, autor, curso, ano, semestre, orientador,palavras_chave, coorientador ).then((res) => {
        resolve(res);
      }).catch((err) => {
          reject(err);
      });
    });
  }

  deleteTcc(id) {
    return new Promise((resolve, reject) => {
      this.tccPersistor.delete(id).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  
  searchTccById(id) {
    return new Promise((resolve, reject) => {
      this.tccPersistor.searchId(id).then((res) => {
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
            this.tccPersistor.searchOrientador(req.busca).then((res)=>{
              resolve(res);
            }).catch((err)=>{
              reject(err);
            });
           break;

          case 'ano':
            this.tccPersistor.searchAno(req.busca).then((res)=>{
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
