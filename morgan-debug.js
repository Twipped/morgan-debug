var Debug = require('debug');
var Morgan = require('morgan');
var through2 = require('through2');

module.exports = function (namespace, format, options) {
	options = options || {};
	var debug = typeof namespace == 'function' ? namespace : Debug(namespace);
	var stream = through2(function (output, enc, callback) {
		debug(output.toString('utf8').trim());
		this.push(output);
		callback();
	});

	// if options contains a stream, insert the debug stream in its place and pipe.
	options.stream = options.stream ? stream.pipe(options.stream) : stream;

	return Morgan(format, options);
};
