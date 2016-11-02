var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.nick_name){
    res.render('after_login');
  }else res.redirect('/');
});

module.exports = router;
