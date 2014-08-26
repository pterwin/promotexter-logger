(function() {
	"use strict";

	var winston = require('winston');
	var os      = require('os');
	var MongoDB = require('winston-mongodb').MongoDB;


	//encapsulate winston logging

	var PromotexterLogger = function() {

		var self      = this;
		var logger    = new (winston.Logger)();
		self.logger   = logger;
		self.hostname = os.hostname();
		self.appname  = null;


		//options

		var conf = require('rc')('promotexter', {});

		logger.add(winston.transports.Console, {'timestamp':true, 'colorize': true});
		if(typeof conf.file === 'object') {
			logger.add(winston.transports.DailyRotateFile, conf.file);
		}

		if(typeof conf.mongodb === 'object') {
			logger.add(MongoDB, conf.mongodb);
		}



		// winston supports string interpolation. We don't need that
		// we just want to concat args
		self.log = function(level, message, more) {

			var meta     = {};
			meta.appname = self.appname;
			meta.host    = self.hostname;

			if(more.length > 0) {
				for(var i in more) {
					message = message + " " + JSON.stringify(more[i]);
				}

			}

			logger[level.toLowerCase()](message, meta);
		};
		self.warn = function(message) {
			self.log('warn', message, Array.prototype.slice.call(arguments, 1));
		};
		self.debug = function(message) {
			self.log('debug', message, Array.prototype.slice.call(arguments, 1));
		};
		self.info = function(message) {
			self.log('info', message, Array.prototype.slice.call(arguments, 1));
		};
		self.error = function(message) {
			self.log('error', message, Array.prototype.slice.call(arguments, 1));
		};


		self.profile = function(tag) {
			var meta     = {};
			meta.appname = self.appname;
			meta.host    = self.hostname;
			self.logger.profile(tag, meta);
		};
	};

	var logger = new PromotexterLogger();
	module.exports = logger;

})();