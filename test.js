var request = require('request');
var https = require('https');
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var app = express();
var fs = require('fs');



http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-type': 'text/html' });

    var data = fs.readFileSync('./test.html', 'utf8');

    res.end(data);

}).listen(8988);
