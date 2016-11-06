var express = require('express');
var router = express.Router();

router.post('/reg', function(req, res) {
    var email = req.body.email;
    var pw = req.body.pw;
    var name = req.body.name;
    var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

    if (!reg.test(email)) {
        return res.json({
            mss: "invailed email"
        });
    }

    var user = new Users({
        email: email,
        pw: pw,
        name: name,
    });


    user.save(function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            req.session.nick_name = user.name;
            req.session.email = user.email;

            res.redirect('/after');
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
            res.redirect('/after');
        } else {
            console.log("no user");
            res.redirect('/');
        }
    });
});


module.exports = router;
