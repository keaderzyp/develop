var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:data', function(req, res, next) {
  var data = req.params.data;
  res.render(data, { title: 'Express' });
});

module.exports = router;
