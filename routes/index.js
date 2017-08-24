var express = require('express');
const request = require('request');
const fs = require('fs');

var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index');
});

app.post('/', function(req, res) {
  req.files.data123.mv('test.wav', function(err) {
    if(err) console.log(err);
    var options = {
        method: 'POST',
        url: 'https://api.wit.ai/speech',
        qs: {
            v: '20170307'
        },
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer DJRULQEHMJOEZZKNXJ2QTH4YZ7PSBIZ4',
            'content-type': 'audio/wav'
        },
        body : fs.createReadStream('test.wav')
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.json(JSON.parse(body));
    });
  });
});

module.exports = app;
