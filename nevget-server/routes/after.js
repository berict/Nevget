var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.nick_name);
  if(req.session.nick_name){
    res.render('gettingstart');
  }else res.redirect('/');
});


module.exports = router;
