var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>azis nurrahman septian<p> <p>2100016101</p>');
});

module.exports = router;