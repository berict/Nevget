var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.nick_name){
    res.redirect('/home');
  } else {
    res.render('index');
  }

});


router.get('/home', function(req, res, next) {
  if(req.session.nick_name){
    Users.findOne({email: req.session.email}, (err, users) => {
      Reminders.find({user_email: req.session.nick_name}, (err, reminder) => {
        if(err) res.render('after_login', {reg_date: users.reg_date, level: users.level,keywords: null});
        if(reminder) res.render('after_login', {reg_date: users.reg_date, level: users.level,keywords: reminder});
        else res.render('after_login', {reg_date: users.reg_date, level: users.level,keywords: null});
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
