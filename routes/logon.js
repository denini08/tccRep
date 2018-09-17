const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

router.get('/', (req,res)=>{
    res.render('login')
})

router.post('/login', (req,res) =>{
    const entrada = req.body;
    console.log(entrada);
})

module.exports = router