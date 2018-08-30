const express = require('express');
const bodyParser = require('body-parser');
const business = require('../business/TCCBusiness');

let tccBusiness = new business();
var router = express.Router();
router.use(bodyParser.json());

//GET

router.get('/insert', (req,res)=>{
    res.render('inserir');
});

router.get('/:isbn', function(req, res, next) {
    a = req.params;
   if(!a.isbn){
       res.send('ERRO PARAMENTRO NAO PASSADO')
   }
    tccBusiness.searchTccByIsbn(a.isbn).then((result) => {
        res.send(result);
      }).catch(() => {
          console.log(`opas`);
          res.
        res.send('Não foi possível encontrar esse tcc, verifique o isbn');
      });
   
});

router.get('/', (req,res,next) =>{
    res.send('defalt');
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
    ).then(() => {
      res.send('Inserção foi massa!');
    }).catch((err) => {
      res.send(err);
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
  console.log("Busca")
  const b = req.body;
  tccBusiness.searchTcc(b).then((res)=>{
    resp.send(res);
  }).catch((err)=>{
    resp.send(err);
  })
})

module.exports = router;
