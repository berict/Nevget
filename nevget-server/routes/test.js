var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  Users.findOne({email: req.session.email}, function(err, users) {
    if(err) err;
    if(!users.isTested || users.isTested == null){
      res.render('brain_test');
    }else{
      res.redirect('/home');
    }
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body); 
});

module.exports = router;
