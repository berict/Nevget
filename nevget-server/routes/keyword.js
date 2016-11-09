var express = require('express');
var router = express.Router();

router.post("/", (req, res) => {
  var title = req.body.title;
  var keyword = req.body.keyword;

});

module.exports = router;
