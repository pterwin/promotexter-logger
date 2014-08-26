(function() {
	"use strict";

	var Log = require('../promotexter-logger');
	Log.appname = 'myapp';

	Log.profile('request');
	Log.info('hello world');
	Log.profile('inside');
	Log.profile('inside');
	Log.info('hello world', 'x', 'y', [1,2,3]);
	Log.profile('request');
	Log.warn('hello world', 'x', 'y', [1,2,3]);
	Log.error('hello world', 'x', 'y', [1,2,3]);
	Log.log('info', 'yahoooo', {});
})();