var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('author', {title: 'Creditos'});
});

module.exports = router;