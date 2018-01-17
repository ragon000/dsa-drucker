var cheerio = require('cheerio');
var request = require('request');

exports.scrape = function(cb){

	url = 'http://www.ulisses-regelwiki.de/index.php/za_zaubersprueche.html';
	request(url, (error, response, html) => {
	var toCB = [];
	if(error) throw error;
	
	var $ = cheerio.load(html);
	
$('.mod_navigation').filter(function(){
var data = $(this);
var counter = 0;
var max = data.children().eq(1).children().first().children().find('a[href]').length
	data.children().eq(1).children().first().children().find('a[href]').each(function()
	{
var element = $(this);
if(element.prop('title')){
//		console.log(element.prop('title'));	
//	console.log(element.prop('href'));
counter++;	
	request('http://www.ulisses-regelwiki.de/'+element.prop('href'), (err, res, htm) =>  {
	var $ = cheerio.load(htm);	
	
$('.mod_article').filter(function(){
var data = $(this);
//data.children().find('p').filter(function ()
//{
//	console.log ($( this ).html());
//    return $( this ).html().localeCompare('&#xA0;') == 0;
//}).remove();
$('p').each(function() {
    var text = $(this).text();
	$(this).removeAttr('style');
if(text.indexOf('Publikation')!=-1) $(this).remove();
	if(text.localeCompare('\xa0')==0) $(this).remove(); 
});
$('span').each(function() {
    var text = $(this).text();
	$(this).removeAttr('style');
if(text.localeCompare('\xa0')==0) $(this).remove(); 
});


if(data.children().first().children().first().text().localeCompare('Whoops! We can\'t find what you\'re looking for')!=0)
	{	toCB.push({title: data.children().first().children().first().text(), data: data.children().first().html()});	
console.log("Scraping: "+data.children().first().children().first().text());
	}
 console.log("Scraping: "+data.children().first().html());

if(counter === max) cb(toCB);
	});	
	});	
}
	});


});
	
	
	});

}
