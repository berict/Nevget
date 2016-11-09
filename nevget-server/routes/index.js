var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

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
      Reminders.find({user_email: req.session.email}, (err, reminder) => {
        if(err) res.render('after_login', {reg_date: users.reg_date, level: users.level, reminders: "null"});
        if(reminder){
          res.render('after_login', {reg_date: users.reg_date, level: users.level, reminders: reminder});
        }
        else res.render('after_login', {reg_date: users.reg_date, level: users.level, reminders: "null"});
      });
    });
  } else {
    res.redirect('/');
  }
});

router.post('/home', function(req, res){
   var title = req.body.thing;
   var keyword = req.body.keyword;
   var date  = moment().tz("Asia/Seoul").format();

   var reminder = new Reminders({
     user_email: req.session.email,
     title: title,
     keyword: keyword,
     date: date
   });

   reminder.save(function(err, data) {
       if (err) {
           console.log(err);
           res.redirect('/home');
       } else {
           res.redirect('/home');
       }
   });
});

module.exports = router;
