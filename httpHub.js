var request = require('request');
var https = require('https');
var http = require('http');
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var app = express();
var cors = require('cors')
var FormData = require('form-data');

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

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.writeHead(200, { 'Content-type': 'text/html' });

        httpRequest(toUrl, toParams,res);
    });

}).listen(8989);

 function httpRequest(toUrl,toParams,rootRes){
    console.log(toUrl + " " + toParams);

    var form = new FormData();
    form.append('dice', toParams);

    //get the html
     var opt = url.parse(toUrl);
     opt.method = 'POST';
     opt.headers = form.getHeaders();

     console.log(opt.headers);
     /*
     opt.headers = {
         'Content-Type': 'multipart/form-data',
         'Content-Length': toParams.length
     };
     */

    var html = "";
    var postReq = https.request(opt,function(res) {
        res.setEncoding('utf-8');
        res.on('data', function(chunk) {
            html += chunk;
        });

        res.on('end', function () {
            //console.log(res);
            rootRes.end(html);
        });
    }).on('error', function(err) {
        console.log(err);
        rootRes.end();
    });

    /*
    postReq.write(toParams);
    postReq.end(); 
    */
    form.pipe(postReq);
 }

