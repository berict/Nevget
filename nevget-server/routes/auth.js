var express = require('express');
var router = express.Router();

router.post('/reg', function(req, res) {
    var email = req.body.email;
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;

    var user = new Users({
        id: id,
        email: email,
        pw: pw,
        name: name,
        age: age,
    });


    user.save(function(err, data) {
        if (err) return res.status(409).send("DB error");
        return{
          res.redirect('/');
        }
    });

});


router.post('/login', function(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;

    Users.findOne({id: id, pw: pw}, function(err, user){
        if(err) req.
        else if(user){
          res.redirect('/al');
        }else{
          res.redirect('/');
        }
    });
});




module.exports = router;
