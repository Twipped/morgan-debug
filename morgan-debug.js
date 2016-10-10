var makeDebug = require('debug');
var Morgan = require('morgan');
var through2 = require('through2');

module.exports = function (namespace, format, options) {
	options = options || {};
	var debug = typeof namespace == 'function' ? namespace : makeDebug(namespace);
	var passThru = !!options.stream;

	var stream = through2(function (output, enc, callback) {
		debug(output.toString('utf8').trim());
		if (passThru) this.push(output);
		callback();
	});

	if (passThru) {
		stream.pipe(options.stream);
	}

	options.stream = stream;

	return Morgan(format, options);
};
