var request = require('request');
var https = require('https');
var http = require('http');
var url = require("url");
var querystring = require('querystring');

http.createServer(function(req,res){
    var data = "";
    req.addListener("data", function (part) {
        data += part;
    });

    req.addListener("end", function () {
        var parseObj = url.parse(req.url, true);
        var toUrl = parseObj.query.url;
        var param = parseObj.query.data;
        console.log(toUrl);
        httpRequest(toUrl,param,res);
    });

}).listen(8989);

 function httpRequest(toUrl,param,rootRes){
    //get the html
    var opt = url.parse(toUrl);
    var html;
    var postReq = https.request(opt,function(res) {
        res.setEncoding('utf-8');
        res.on('data', function(chunk) {
            html += chunk;
        });

        res.on('end', function() {
            rootRes.write(html);
            rootRes.end();
        });
    }).on('error', function(err) {
        console.log(err);
        rootRes.end();
    });

    postReq.write(querystring.stringify(param));
    postReq.end(); 
 }

