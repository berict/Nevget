var express = require('express');
var router = express.Router();

router.post('/reg', function(req, res) {
    var email = req.body.email;
    var pw = req.body.pw;
    var pw_c = req.body.pw_c;
    var name = req.body.name;

    if(pw == pw_c){
      var user = new Users({
          email: email,
          pw: pw,
          name: name,
      });


      user.save(function(err, data) {
          if (err) res.redirect('/');
          else{

            req.session.regenerate(function() {
                req.session.nick_name = user.name;
                res.redirect('/after');
            });

          }
      });

    }else{
      res.redirect('/');
    }

});


router.post('/login', function(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;

    Users.findOne({id: id, pw: pw}, function(err, user){
        if(err) res.redirect('/');

        if(user){
          req.session.regenerate(function() {
              req.session.nick_name = user.name;
              res.redirect('/after');
          });
      
        }
        else res.redirect('/');
    });
});




module.exports = router;
