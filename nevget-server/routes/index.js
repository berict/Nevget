var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.nick_name){
    res.redirect('/after');
  } else {
    res.render('index');
  }

});


router.get('/home', function(req, res, next) {
  if(req.session.nick_name){
    res.render('after_login');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
