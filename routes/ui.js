/**
 * Created with tualo IDE.
 * Author: Thomas Hoffmann
 * Date: 2013-04-22
 */
var app;

var fs = require('fs');
var path = require('path');
var http = require('http');
var querystring = require('querystring');
var Iconv  = require('iconv').Iconv;

var startUI = function(req, res, next) {
	res.render('layout',{
		title: 'tualo - DPD Label'
	});
}

var print_dpd = function(req,res,next){
	var file_data = [];
	var data = [];
	data.push('Kunde');
	data.push('Name1');
	data.push('Name2');
	data.push('Strasse');
	data.push('Land');
	data.push('PLZ');
	data.push('Ort');
	data.push('Gewicht');
	data.push('ID');
	file_data.push(data.join(';'));
	
	data = [];
	data.push(req.body.kunde);
	data.push(req.body.name);
	data.push(req.body.zusatz);
	data.push(req.body.strasse+' '+req.body.hn);
	data.push('DE');
	data.push(req.body.plz);
	data.push(req.body.ort);
	data.push(req.body.gewicht);//Math.round((req.body.gewicht.replace(',','.').replace('-','.') )*100) );
	data.push(req.body.id);
	file_data.push(data.join(';'));
	
	//var buffer = new Buffer(,'utf8');
	var iconv = new Iconv('UTF-8', 'ISO-8859-1');
	var buffer = iconv.convert(file_data.join("\r\n"));
	
	fs.writeFile('/dpd-import/'+req.params.path+'/'+(new Date()).getTime()+'.txt', buffer, function (err) {
		res.json({
			success: true,
			err: err
		});
		return;
	});
}

var post = function(req, res, next){
	var userString = '';
	userString = querystring.stringify(req.body);
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': userString.length
	};
	var options = {
		host: app.get('wawi_host'),
		path:  app.get('wawi_path'),
		method: 'POST',
		headers: headers
	};
	
	var xreq = http.request(options, function(xres) {
		xres.setEncoding('utf-8');
		var responseString = '';
		
		xres.on('data', function(data) {
			
			responseString += data;
		});
		xres.on('end', function() {
			try{
				var resultObject = JSON.parse(responseString);
				res.json(resultObject);
				return;
			}catch(e){
				res.json({
					success: false,
					msg: e.message,
					str: responseString
				});
				return;
			}
		});
	});
	
	xreq.on('error', function(e) {
		res.json({
			success: false,
			msg: e.message
		});
	});
	xreq.write(userString);
	xreq.end();
}

var get = function(req, res, next){
	var userString = '';
	userString = querystring.stringify(req.query);
	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': userString.length
	};
	var options = {
		host: app.get('wawi_host'),
		path:  app.get('wawi_path'),
		method: 'POST',
		headers: headers
	};
	
	var xreq = http.request(options, function(xres) {
		xres.setEncoding('utf-8');
		var responseString = '';
		
		xres.on('data', function(data) {
			
			responseString += data;
		});
		xres.on('end', function() {
			try{
				var resultObject = JSON.parse(responseString);
				res.json(resultObject);
				return;
			}catch(e){
				res.json({
					success: false,
					msg: e.message,
					str: responseString
				});
				return;
			}
		});
	});
	
	xreq.on('error', function(e) {
		res.json({
			success: false,
			msg: e.message
		});
	});
	xreq.write(userString);
	xreq.end();
}

exports.initRoute=function(_app){
	app=_app;
	app.get("/",startUI);
	app.get("/:path/",startUI);
	app.post("/:path/post",post);
	app.get("/:path/post",get);
	app.post("/:path/print",print_dpd);
}

