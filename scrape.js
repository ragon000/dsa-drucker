var cheerio = require('cheerio');
var request = require('requestretry');

exports.scrape = function(art, cb) {
    switch (art) {
        case 'Karmale Sonderfertigkeiten':
            url = 'http://www.ulisses-regelwiki.de/index.php/SF_karmal.html';
            break;
        case 'Magische Sonderfertigkeiten':
            url = 'http://www.ulisses-regelwiki.de/index.php/SF_Magie.html';
            break;
        case 'Kampf Sonderfertigkeiten':
            url = 'http://www.ulisses-regelwiki.de/index.php/sf_kampfsonderfertigkeiten.html';
            break;
        case 'Allgemeine Sonderfertigkeiten':
            url = 'http://www.ulisses-regelwiki.de/index.php/sf_allgemeine_sonderfertigkeiten.html';
            break;
        case 'Nachteile':
            url = 'http://www.ulisses-regelwiki.de/index.php/nachteile.html';
            break;
        case 'Vorteile':
            url = 'http://www.ulisses-regelwiki.de/index.php/vorteile.html';
            break;
        case 'Zeremonien':
            url = 'http://www.ulisses-regelwiki.de/index.php/lt_zeremonien.html';
            break;
        case 'Segnungen':
            url = 'http://www.ulisses-regelwiki.de/index.php/Lit_Segnungen.html';
            break;
        case 'Litrugien':
            url = 'http://www.ulisses-regelwiki.de/index.php/lt_liturgien.html';
            break;
        case 'Zaubersprüche':
            url = 'http://www.ulisses-regelwiki.de/index.php/za_zaubersprueche.html';
            break;
        case 'Zaubertricks':
            url = 'http://www.ulisses-regelwiki.de/index.php/Zauber_Zaubertricks.html';
            break;
        case 'Rituale':
            url = 'http://www.ulisses-regelwiki.de/index.php/za_rituale.html';
            break;
        default:
            url = 'http://www.ulisses-regelwiki.de/index.php/za_zaubersprueche.html';
            break;
    }
    //console.log("getting: " + art);
    request(url, (error, response, html) => {
        var toCB = [];
        if (error) throw error;

        var $ = cheerio.load(html);

        $('.mod_navigation').filter(function() {
            var data = $(this);
            var counter = 0;

            var max = data.children().eq(1).children().find('a[href]').length
            data.children().eq(1).children().find('a[href]').each(function() {
                var element = $(this);
                if (element.prop('title')) {
                    //		console.log(element.prop('title'));	
                    //	console.log(art+": "+element.prop('href'));
                    counter++;
                    request('http://www.ulisses-regelwiki.de/' + element.prop('href'), (err, res, htm) => {
                        if (!htm) return;
                        var $ = cheerio.load(htm);

                        $('.mod_article').filter(function() {
                            var data = $(this);
                            //data.children().find('p').filter(function ()
                            //{
                            //	console.log ($( this ).html());
                            //    return $( this ).html().localeCompare('&#xA0;') == 0;
                            //}).remove();
                            $('p').each(function() {
                                var text = $(this).text();
                                $(this).removeAttr('style');
                                if (text.indexOf('Publikation') != -1) $(this).remove();
                                if (text.localeCompare('\xa0') == 0) $(this).remove();
                            });
                            $('span').each(function() {
                                var text = $(this).text();
                                $(this).removeAttr('style');
                                if (text.localeCompare('\xa0') == 0) $(this).remove();
                            });


                            if (data.children().first().children().first().text().localeCompare('Whoops! We can\'t find what you\'re looking for') != 0) {
                                toCB.push({
                                    title: data.children().first().children().first().text(),
                                    data: data.children().first().html()
                                });

                                // console.log(art+": "+data.children().first().children().first().text());
                            }
                            //console.log("Scraping: "+data.children().first().html());

                            if (counter === max) cb(toCB);
                        });
                    });
                }
            });


        });


    });

}

function compare(a, b) {
return a.title.localeCompare(b.title);
}
