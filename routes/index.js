var express = require('express');
var router = express.Router();
var TinyURL = require('tinyurl');
var validUrl = require('valid-url');
var urlParse = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {

   if (req.query.s === undefined) {
      res.render('index', {
         title: 'url-shortener'
      });

   }
   else {
      var url = req.query.s;
      res.redirect('http://tinyurl.com/'+url);
 
   }

});



router.get('/short', function (req, res, next) {

   var url = req.query.s || 'hhhh';
  
   if (validUrl.isUri(url)) {
      TinyURL.shorten('http://google.com', function (data) {
         
        res.json({
           "original_url":url,
           "short_url":'http://fcc-shorty.heroku.com/'+urlParse.parse(data).pathname
        }); 
         
      });
      
   }
   else {
      res.json({
         "error": true,
         "code": "not valid url"
      });
   }

});

module.exports = router;
