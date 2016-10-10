
var test    = require('tap').test;
var request = require('supertest');
var express = require('express');
var through2 = require('through2');
var stepper = require('stepperbox')();
var morganDebug = require('../');

test('express requests get passed through to debug', (t) => {
	t.plan(3);
	stepper.reset(true);
	stepper.add(function () {
		t.deepEqual([].slice.apply(arguments), [
			'GET / 200'
		], 'debug received event');
	});

	var logger = morganDebug(stepper, ':method :url :status');
	
	var app = express();
	app.use(logger);
	app.get('/', (req, res) => res.json({ok: true}));

	request(app)
		.get('/')
		.end((err, res) => {
			t.error(err);
			t.equal(stepper.getStep(), 1, 'Debug only invoked once');
			t.end();
		});
});

test('events get passed through to a provided stream', (t) => {
	t.plan(5);
	stepper.reset(true);
	stepper.add(function () {
		t.deepEqual([].slice.apply(arguments), [
			'GET / 200'
		], 'debug received event');
	});

	var stream = through2(function (output, enc, callback) {
		t.isa(output, Buffer);
		t.strictEqual(JSON.stringify(output.toString('utf8')), JSON.stringify('GET / 200\n'), 'Stream received event');
		callback();
	});

	var logger = morganDebug(stepper, ':method :url :status', {stream});
	
	var app = express();
	app.use(logger);
	app.get('/', (req, res) => res.json({ok: true}));

	request(app)
		.get('/')
		.end((err, res) => {
			t.error(err);
			t.equal(stepper.getStep(), 1, 'Debug only invoked once');
			t.end();
		});
});