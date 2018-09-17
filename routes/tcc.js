const express = require('express');
const bodyParser = require('body-parser');
const business = require('../business/TCCBusiness');
const stream = require('stream');
const api = require('../googleAPI/GoogleDrive')



let tccBusiness = new business();
var router = express.Router();
router.use(bodyParser.json());



//GET
router.get('/insert', (req,res)=>{
    res.render('inserir', { mensagem: null });
});

router.get('/:id', function(req, res, next) {
    a = req.params;
   if(isNaN(a.id)){
       res.render('errorComMensagem', {erroMensagem:  'Não foi possível encontrar esse tcc, verifique se o id é um numero'});
      return;
    }
    tccBusiness.searchTccById(a.id).then((result) => {
      res.render("mostrar_tcc", {
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
          res.render('errorComMensagem', {erroMensagem:  'Não foi possível encontrar esse tcc, verifique o id'});
      });
   
});

router.get('/', (req,res,next) =>{
    res.render('index');
});


//POST
router.post('/insert', (req,res,next) =>{
    

    let sampleFile = req.files.pdfzin;
    console.log(sampleFile);

    const bufferStream = new stream.PassThrough();
    bufferStream.end(new Buffer(sampleFile.data));
    api.uploadFile(sampleFile.name, bufferStream).then((resp) =>{
      console.log(resp);
      console.log('entrou');
    }).catch((err)=>{
      console.log(err);
      return;
    })

  

    const b = req.body;
    tccBusiness.insertTcc(
      b.titulo,
      b.tema,
      b.palavras_chave,
      b.autor,
      b.orientadores1,
      b.orientadores2,
      b.orientadores3,
      b.coorientador1,
      b.coorientador2,
      b.coorientador3,
      b.curso,
      b.ano,
      b.semestre,
    ).then(() => {
      res.render('inserir', { mensagem: 'Tcc inserido com sucesso!!' });
    }).catch((err) => {
      res.render('errorComMensagem', {erroMensagem: err});
    });
});

router.post('/delete', (request, response) => {
    const b = request.body;
    tccBusiness.deleteTcc(b.id).then((res) => {
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
  console.log(req.body);
  res.send(req.body);
})

module.exports = router;
