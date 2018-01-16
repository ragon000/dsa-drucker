var cheerio = require('cheerio');
var request = require('request');

exports.scrape = function(cb){

	url = 'http://www.ulisses-regelwiki.de/index.php/za_zaubersprueche.html';
	request(url, (error, response, html) => {
	
	if(error) throw error;
	
	var $ = cheerio.load(html);
	
$('.mod_navigation').filter(function(){
var data = $(this);

//console.log(
	data.children().eq(1).children().first().children().find('a').each(function()
	{
var element = $(this);
if(element.prop('title')){
		console.log(element.prop('title'));	
	console.log(element.prop('href'));
	
	request('http://www.ulisses-regelwiki.de/'+element.prop('href'), (err, res, htm) =>  {
	var $ = cheerio.load(htm);	
	
$('.mod_article').filter(function(){
var data = $(this);
		console.log(data.children().first().html());
	});	
	});	
}
	});


});
	
	
	});

}
