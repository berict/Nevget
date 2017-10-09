var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var rndString = require('randomstring');


router.get('/', function(req, res, next) {
  console.log(req.session.nick_name);
  if(req.session.nick_name){
    res.render('gettingstart');
  }else res.redirect('/');
});

router.post('/', function(req, res) {
  var date = moment().tz("Asia/Seoul").format();

   Users.findOne({email: req.session.email}, function(err, users){
     if(err) err;
     if(users){
       var remind = new Reminders({
         title: req.body.thing,
         hints: req.body.keyword,
         date: date,
         user_email: req.session.email,
         hash_key: rndString.generate(),
       });

       remind.save(function(err, data) {
           if (err) {
             res.redirect('/home');
           } else {
             res.redirect('/home');
           }
       });

     }
   });
});


module.exports = router;
