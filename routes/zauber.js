var express = require('express');
var router = express.Router();
var scraper = require('../scrape');

var spruche = [];
scraper.scrape('sprüche', (cb)=>{
spruche=cb
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('content', { title: 'Zaubersprüche', data: spruche });
});
router.post('/', function(req, res, next) {
console.log(req.body.Sprüche);
	var toPrint = [];
	spruche.forEach( (element)=>{
	if(req.body.Sprüche.includes(element.title)) toPrint.push(element.data);  
	});
	res.render('print', { title: 'Zaubersprüche', data: toPrint });
});

module.exports = router;
