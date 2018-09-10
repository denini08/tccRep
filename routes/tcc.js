const express = require('express');
const bodyParser = require('body-parser');
const business = require('../business/TCCBusiness');

let tccBusiness = new business();
var router = express.Router();
router.use(bodyParser.json());

//GET

router.get('/insert', (req,res)=>{
    res.render('inserir', { mensagem: null });
});

router.get('/:isbn', function(req, res, next) {
    a = req.params;
   if(isNaN(a.isbn)){
       res.render('errorComMensagem', {erroMensagem:  'Não foi possível encontrar esse tcc, verifique se o isbn é um numero'});
      return;
    }
    tccBusiness.searchTccByIsbn(a.isbn).then((result) => {
      res.render("mostrar_tcc", {isbn: result[0].isbn,
                                titulo: result[0].titulo, 
                                tema: result[0].tema,
                                autor: result[0].autor,
                                curso: result[0].curso,
                                ano: result[0].ano,
                                semestre: result[0].semestre,
                                orientadores: result[0].orientadores
                              });
      }).catch(() => {
          console.log(`erro mostrar`);
          res.render('errorComMensagem', {erroMensagem:  'Não foi possível encontrar esse tcc, verifique o isbn'});
      });
   
});

router.get('/', (req,res,next) =>{
    res.render('index');
});


//POST
router.post('/insert', (req,res,next) =>{
    const b = req.body;
    console.log(b);
    tccBusiness.insertTcc(
      b.isbn,
      b.titulo,
      b.tema,
      b.autor,
      b.curso,
      b.ano,
      b.semestre,
      b.orientadores
    ).then(() => {
      res.render('inserir', { mensagem: 'Tcc inserido com sucesso!!' });
    }).catch((err) => {
      res.render('errorComMensagem', {erroMensagem: err});
    });
});

router.post('/delete', (request, response) => {
    const b = request.body;
    tccBusiness.deleteTcc(b.isbn).then((res) => {
      response.send('excluido: ' + res);
    }).catch((err) => {
      response.send('erro: ' + err);
    });
});

router.post('/search', (req,resp) =>{
  console.log("Busca " + req.body.busca + " campo "+ req.body.campo)
  const b = req.body;
  console.log(b);
  tccBusiness.searchTcc(b).then((res)=>{
    console.log(res);
    resp.render('resultadosBusca', {retorno: res, 
                                    string: req.body.busca});
  }).catch((err)=>{
    resp.send('errorComMensagem', {erroMensagem: err});
  })
})

router.post('/teste', (req,res)=>{
  console.log('aeee');
  res.send(req.body);
})

module.exports = router;
