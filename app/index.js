var path = require('path'),
    fs = require('fs');

var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    compress = require('compression'),

    app = express();

app.use(favicon(path.join(__dirname, '/favicon.ico')));

app.use(compress());
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'))

app.all('/cgi', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By',' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.use('/cgi/todo', require('./router/todo'));

app.listen(8089, function () {
    console.log('server start');
});