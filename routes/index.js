var scraper = require('../scrape');
var express = require('express');
var router = express.Router();

var data = [];

scraper.scrape('Karmale Sonderfertigkeiten', (cb) => {
    data[0] = {
        title: 'Karmale Sonderfertigkeiten',
        inner: cb
    };
});
scraper.scrape('Magische Sonderfertigkeiten', (cb) => {
    data[1] = {
        title: 'Magische Sonderfertigkeiten',
        inner: cb
    };
});
scraper.scrape('Kampf Sonderfertigkeiten', (cb) => {
    data[2] = {
        title: 'Kampf Sonderfertigkeiten',
        inner: cb
    };
});
scraper.scrape('Allgemeine Sonderfertigkeiten', (cb) => {
    data[3] = {
        title: 'Allgemeine Sonderfertigkeiten',
        inner: cb
    };
});
scraper.scrape('Nachteile', (cb) => {
    data[4] = {
        title: 'Nachteile',
        inner: cb
    };
});
scraper.scrape('Vorteile', (cb) => {
    data[5] = {
        title: 'Vorteile',
        inner: cb
    };
});
scraper.scrape('Zeremonien', (cb) => {
    data[6] = {
        title: 'Zeremonien',
        inner: cb
    };
});
scraper.scrape('Segnungen', (cb) => {
    data[7] = {
        title: 'Segnungen',
        inner: cb
    };
});
scraper.scrape('Litrugien', (cb) => {
    data[8] = {
        title: 'Litrugien',
        inner: cb
    };
});
scraper.scrape('Zaubersprüche', (cb) => {
    data[9] = {
        title: 'Zaubersprüche',
        inner: cb
    };
});
scraper.scrape('Rituale', (cb) => {
    data[10] = {
        title: 'Rituale',
        inner: cb
    };
});
/* GET home page. */
scraper.scrape('Zaubertricks', (cb) => {
    data[11] = {
        title: 'Zaubertricks',
        inner: cb
    };
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('content', {
        title: 'DSA Zauber Drucker',
        data: data
    });
});
router.post('/', function(req, res, next) {
    //console.log(req.body);
    //console.log(data);
    var toPrint = [];

    for (var key in req.body) {
        data.forEach((element, index, array) => {

            //            console.log(key + " : " + element.title + " : " + key.localeCompare(element.title));
            if (key.localeCompare(element.title) == 0) {
                //console.log(req.body[element.title]);
                if (Array.isArray(req.body[element.title]))
                    req.body[element.title].forEach((e) => {
                        element.inner.forEach((cb, index, array) => {
                            //console.log(e + " : " + cb.title + " : " + e.localeCompare(cb.title));
                            if (e.localeCompare(cb.title) == 0) {
                                toPrint.push(cb);
                                //console.log(cb)
                            }


                        });


                    });
                else {
                    var e = req.body[element.title]
                    element.inner.forEach((cb, index, array) => {
                        //console.log(e + " : " + cb.title + " : " + e.localeCompare(cb.title));
                        if (e.localeCompare(cb.title) == 0) {
                            toPrint.push(cb);
                            //console.log(cb)
                        }


                    });
                }



            }




            //console.log(index + ":"+array.length);
            if (index == array.length - 1) {
                setTimeout(function() {
                    res.render('print', {
                        title: 'DSA PRINTER',
                        data: toPrint
                    });
                }, 10);

            }
        });
    }


});
module.exports = router;
