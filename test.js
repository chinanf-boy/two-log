import test from 'ava';
import log, { loggerStart, loggerText, loggerStop, _UNLOCK } from '.';

test.failing('log debug no boolean', t => {
	let l = log('asdf');
});

test('ora -- log init', t => {
	let l = log();
	t.is(!!l.text, true);
	t.is(!!l.start, true);
	t.is(!!l.stop, true);
});

test.failing('log LOCK , throw', t => {
	let l = log();
	t.is(!!l.text, true);
	t.is(!!l.start, true);
	t.is(!!l.stop, true);
});

test('ora not start , return false', t => {
	_UNLOCK();

	let l = log();
	t.is(l.text('no start'), false);
	t.is(l.stop('no start'), false);
});

test('ora succeed', t => {
	_UNLOCK();
	let l = log();
	let s = 'ora';
	let oraState = 'succeed';
	let info = 'info';
	t.is(l.start('ok ora starting'), s + ' start');
	t.is(l.text('ok ora running'), s + ' text');
	t.is(
		l.stop('ok ora stopping', { ora: oraState, log: info }),
		s + ' ' + oraState
	);
});

test('ora start after one', t => {
	_UNLOCK();
	let l = log();
	let s = 'ora';
	let oraState = 'succeed';
	let info = 'info';
	t.is(l.start('ok ora starting'), s + ' start');
	t.is(l.text('ok ora running'), s + ' text');
	t.is(l.one('ok ora running'), true);

	t.is(
		l.stop('ok ora stopping', { ora: oraState, log: info }),
		s + ' ' + oraState
	);
});

test('ora before one ', t => {
	_UNLOCK();

	let l = log();
	let s = 'ora';
	let color = 'red';
	let oraState = 'fail';
	let info = 'info';
	t.is(l.one('ok ora one running'), true);

	t.is(l.start('ok ora starting', { ora: color }), s + ' start');

	t.is(l.text('ok ora running'), s + ' text');

	t.is(
		l.stop('ok ora stopping', { ora: oraState, log: info }),
		s + ' ' + oraState
	);
});

test('ora stop', t => {
	_UNLOCK();

	let l = log();
	let s = 'ora';
	let oraState = 'success';
	t.is(l.start('ok ora starting'), s + ' start');
	t.is(l.text('ok ora running'), s + ' text');
	t.is(l.stop(), s + ' stop');
});

test('ora -+= loggerAPI ', t => {
	let s = 'ora';
	let oraState = 'succeed';
	let info = 'info';

	t.is(loggerStart('ora Loggerstart'), s + ' start');
	t.is(loggerText('ora LoggerText'), s + ' text');
	t.is(
		loggerStop('ora LoggerStop', { ora: oraState, log: info }),
		s + ' ' + oraState
	);
});

test('winston -- log default', t => {
	_UNLOCK();

	let l = log(true);
	t.is(!!l.text, true);
	t.is(!!l.start, true);
	t.is(!!l.stop, true);
});

test('winston default level:debug  ', t => {
	_UNLOCK();

	let l = log(true);
	let s = 'log';
	let oraState = 'success';
	let debug = 'debug';
	let e = 'error';
	console.log();
	t.is(
		l.start('log  default level:debug  starting', { log: debug }),
		s + ' debug'
	);
	t.is(l.one('ok one running false'), false);

	t.is(l.text('log  set level:error  running', { log: e }), s + ' error');

	t.is(
		l.stop('log  default level:debug  stopping', { ora: oraState, log: debug }),
		s + ' debug'
	);
	console.log();
});

test('winston default level: no set  ', t => {
	_UNLOCK();

	let l = log(true);
	let s = 'log';
	let oraState = 'success';
	let debug = 'debug';
	let e = 'error';
	console.log();
	t.is(
		l.start('log  default level:debug  starting', { ora: 'yellow' }),
		s + ' debug'
	);

	t.is(l.text('log  set level:error  running', { log: e }), s + ' error');

	t.is(
		l.stop('log  default level:debug  stopping', { ora: oraState, log: debug }),
		s + ' debug'
	);
	console.log();
});

test('winston not start , return false', t => {
	_UNLOCK();

	let l = log(true);
	t.is(l.text('no start'), false);
	t.is(l.stop('no start'), false);
});

test('winston use API, set winston level:info ', t => {
	_UNLOCK();
	let userUse = api => {
		let winston = api.log;
		let wopts = {
			level: 'info',
		};
		api.setLog(wopts);
	};
	console.log();

	let l = log(true, userUse);
	let s = 'log';
	let oraState = 'success';
	let debug = 'debug';
	let e = 'error';
	t.is(
		l.start('winston level:info winston starting', { log: debug }),
		s + ' debug'
	);
	// return debug , but no console.debug show
	t.is(l.text('winston level:info winston running', { log: e }), s + ' error');

	t.is(
		l.stop('winston level:info winston stopping', {
			ora: oraState,
			log: debug,
		}),
		s + ' debug'
	);

	console.log();
});

test('winston -+= loggerAPI ', t => {
	_UNLOCK();

	let l = log(true);
	let s = 'log';
	let oraState = 'success';
	let debug = 'debug';
	let e = 'error';
	console.log();

	t.is(
		loggerStart('default log:level:debug loggerAPI loggerStart ', {
			log: debug,
		}),
		s + ' debug'
	);
	t.is(
		loggerText('default log:level:debug loggerAPI loggerText ', { log: e }),
		s + ' error'
	);
	t.is(
		loggerStop('default log:level:debug loggerAPI loggerStop ', {
			ora: oraState,
			log: debug,
		}),
		s + ' debug'
	);
	console.log();
});
