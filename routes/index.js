var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/de', (req, res)=>{
  var t = req.query.busca;
  console.log('aaaa' + t);
  res.send('AL  OW')
})
module.exports = router;
