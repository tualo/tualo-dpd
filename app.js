/**
 * Created with tualo IDE.
 * Author: Thomas Hoffmann
 * Date: 2013-04-12
 * Last Changes: 2013-04-16
 *  
 */

var routes = ['ui'];

var express = require('express');
var config = {
	session_secret: 'test',
	servers:[
		{
			port: 8011,
			
		}
	]
};
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

var initServer = function(){
	i=0;
	//for(var i in config.servers){
		app.configure(function(){
			app.set('port',config.servers[i].port);
			app.set('wawi_host', config.servers[i].wawi_host);
			app.set('wawi_path', config.servers[i].wawi_path);
			app.set('views', __dirname + '/views');
			app.set('view engine', 'jade');
			app.use(express.json());
			app.use(express.urlencoded());
			app.use(express.cookieParser());
			//app.use(express.session({ secret: config.session_secret}));
			app.use(express.static(path.join(__dirname, 'public')));
			
			
			
		});
		
		var server = http.createServer(app);
		server.listen(app.get('port'), function(){
			console.log("you can test in your browser http://localhost:" + app.get('port'));
		});
		
		app.server = server; // bring the baseDir to the project-route
		app.startDirectory = __dirname; // bring the baseDir to the project-route
		for(var j in routes){
			require('./routes/'+routes[j]).initRoute(app);
		}
	//}
}

function findConfiguration(){
	fs.exists(path.join('/etc','tualo-dpd','config.json'),function(exists){
		if (exists){
			try{
				config = require(path.join('/etc','tualo-dpd','config.json'));
				initServer();
			}catch(e){
				logger.log('error','The configuration is invalid *1. '+e.Error);
			}
		}else{
			fs.exists(path.join(__dirname,'config','config.json'),function(exists){
				if (exists){
					try{
						config = require(path.join(__dirname,'config','config.json'));
						initServer();
					}catch(e){
						logger.log('error','The configuration is invalid *2.'+e);
					}
				}else{
					logger.log('error','There is no configuration file.');
					process.exit();
				}
			});
		}
	});
}

findConfiguration();