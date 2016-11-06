var express = require('express');
var router = express.Router();
var unirest = require('unirest');
const fs = require('fs');
var api_key = 'pubkey-f10721c595218b5133f87c63806df720';

router.post('/', (req, res) => {
    unirest.get('https://api.mailgun.net/v3/address/validate?address=' + req.body.email + '&api_key=pubkey-f10721c595218b5133f87c63806df720')
        .end(function(response) {
            res.send(response.body.is_valid);
        });
});

module.exports = router;
