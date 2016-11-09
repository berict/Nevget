var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
  if(req.session.nick_name){
    res.render('settings', {name: req.session.nick_name, email:req.session.email});
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var prePass = req.body.prePass;
  var newPass = req.body.newPass;

  Uesrs.findOne({email: email, pw: prePass}, function(err, users){
      if(err) return res.json({mss: "DB error"});
      if(users){
        Users.update({email: email}, {$set: {pw: newPass}}, function(err, result) {
          if(err) return res.json({mss: "DB update error"});
          if(result) return res.json({mss: "successfully update"});
        });
      }else{
         res.json({mss: "현재 비번이 잘못되었습니다"});
      }
  });

});


module.exports = router;
