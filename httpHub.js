var request = require('request');
var https = require('https');
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var app = express();
var cors = require('cors')

//app.use(cors());
//app.options('*', cors());

http.createServer(function(req,res){
    var data = "";
    req.addListener("data", function (part) {
        data += part;
    });

    req.addListener("end", function () {
        params = querystring.parse(data);
        var toUrl = params.url;
        var toParams = params.data;
        console.log(params);

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.writeHead(200, { 'Content-type': 'text/html' });

        httpRequest(toUrl, toParams,res);
    });

}).listen(8989);

 function httpRequest(toUrl,param,rootRes){
    //get the html
     var opt = url.parse(toUrl);
     opt.method = 'POST';
     opt.headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Length': param.length
     };

    var html = "";
    var postReq = https.request(opt,function(res) {
        res.setEncoding('utf-8');
        res.on('data', function(chunk) {
            html += chunk;
        });

        res.on('end', function () {
            rootRes.end(html);
        });
    }).on('error', function(err) {
        console.log(err);
        rootRes.end();
    });

    postReq.write(param);
    postReq.end(); 
 }

