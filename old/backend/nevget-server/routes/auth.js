var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');


router.post('/reg', function(req, res) {
    var email = req.body.email;
    var pw = req.body.pw;
    var name = req.body.name;
    var date = moment().tz("Asia/Seoul").format();

    var user = new Users({
        email: email,
        pw: pw,
        name: name,
        reg_date: date
    });


    user.save(function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            req.session.regenerate(function() {
                req.session.nick_name = user.name;
                req.session.email = user.email;
                res.redirect('/after');
            });
        }
    });
});


router.post('/login', function(req, res) {
    var email = req.body.email;
    var pw = req.body.pw;

    Users.findOne({
        email: email,
        pw: pw
    }, function(err, user) {
        if (err) res.redirect('/');

        if (user) {
            req.session.nick_name = user.name;
            req.session.email = user.email;
            res.redirect('/home');
        } else {
            console.log("no user");
            res.redirect('/');
        }
    });
});


module.exports = router;
