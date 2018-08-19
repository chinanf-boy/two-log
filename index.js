'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
}); // es6 export default
const winston = require('winston');
const Ora = require('ora');
const pkgName = require('get-module-name').sync();

const onlyWhat = (only, str) => {
	return !only || only === str;
};
const mergeOpts = (opts, step) => {
	const M = (s, o) => Object.assign(s, o);

	let s0 = { color: 'yellow', end: 'succeed' }; // oneOra - default opts
	let s12 = { ora: 'yellow', log: 'debug' }; // start/test - default opts
	let s3 = { ora: '', log: 'debug' }; // stop - deafult opts

	if (step === 0) {
		return M(s0, opts);
	}
	if (step === 3) {
		return M(s3, opts);
	}
	return M(s12, opts);
};
// two-log
let D = false; // default no debug
let LOGGER = null; // main
let LOCK = false; // only one set debug
let LoggerNAME = 'ora'; // for test
const forText = (msgs = []) => {
	return mags.join('');
};
// log
let defaultWinston = {
	level: 'debug',
	transports: [
		new winston.transports.Console({
			datePattern: '.yyyy-MM-ddTHH-mm',
			colorize: true,
		}),
		new winston.transports.File({
			filename: `${pkgName}.log`,
			handleExceptions: true,
			maxsize: 52000,
			maxFiles: 1,
			level: 'info',
			colorize: true,
		}),
	],
};
let logOpts = null; // winston options merge user options

// two-log

const twoLog = (debug = false, userUse) => {
	if (typeof debug !== 'boolean') {
		throw new TypeError(`Expected a string, got ${typeof debug}`);
	} else {
		if (LOCK) {
			throw new TypeError(`Set two-log debug just only one,❌`);
		}

		D = debug;
		LoggerNAME = D ? 'log' : 'ora';
		LOCK = true;
	}

	userUse && userUse(API);

	return {
		start: loggerStart,
		text: loggerText,
		stop: loggerStop,
		one: oneOra,
	};
};

// user use API
let API = {
	ora: Ora,
	log: winston,
	setLog: options => {
		logOpts = Object.assign({}, defaultWinston, options);
	},
};

// for test
const _UNLOCK = function() {
	LOCK = false;
};

/**
 * @description one time ora spinner
 * @param {string} str
 * @param {any} options
 * @param {string} options.color yellow
 * @param {string} options.end succeed
 */
function oneOra(str, options) {
	let { color, end } = mergeOpts(options, 0);

	if (LOGGER && !D) {
		let l = LOGGER;
		let oldColor = l.color;
		let oldText = l.text;
		l.color = color;
		l.text = str;

		if (str && end) {
			l[end](str);
		} else {
			l.stop();
		}

		LOGGER = Ora(oldText).start();
		LOGGER.color = oldColor;
	} else if (!D && !LOGGER) {
		let l = Ora(str).start();
		l.color = color;

		if (str && end) {
			l[end](str);
		} else {
			l.stop();
		}

		l = null;
	} else {
		return false;
	}
	return true;
}

/**
 * @description start logger
 * @param {string} str
 * @param {string} options.ora ora color
 * @param {string} options.log winston log level
 * @param {string} options.only only one {ora|log}
 */
function loggerStart(str, options) {
	logOpts = logOpts ? logOpts : defaultWinston;

	let { ora, log, only } = mergeOpts(options, 1);

	let res = ' '; // for test

	if (!D && onlyWhat(only, 'ora')) {
		LOGGER = Ora(str).start();
		LOGGER.color = ora;

		res = forText([res, 'start']);
	} else if (D && onlyWhat(only, 'log')) {
		LOGGER = new winston.Logger(logOpts);
		LOGGER[log](str);

		res = forText([res, 'log']);
	}

	return forText([LoggerNAME, res]);
}

/**
 * @description set logger text
 * @param {String} str
 * @param {string} options.ora ora color
 * @param {string} options.log winston log level
 * @param {string} options.only only one {ora|log}
 */
function loggerText(str, options) {
	if (!LOGGER) {
		return false;
	}
	let { ora, log, only } = mergeOpts(options, 2);

	let res = ' '; // for test

	if (!D && onlyWhat(only, 'ora')) {
		LOGGER.text = str;
		LOGGER.color = ora;

		res = forText([res, 'text']);
	} else if (D && onlyWhat(only, 'log')) {
		LOGGER[log](str);

		res = forText([res, log]);
	}
	return forText([LoggerNAME, res]);
}

/**
 * @description logger stop
 * @param {string} str
 * @param {string} options.ora ora {fail|succeed|warn} https://github.com/sindresorhus/ora#instance
 * @param {string} options.log winston log level
 * @param {string} options.only only one {ora|log}
 */
function loggerStop(str, options) {
	if (!LOGGER) {
		return false;
	}
	let { ora, log, only } = mergeOpts(options, 3);

	let res = ' '; // for test

	if (!D && onlyWhat(only, 'ora')) {
		if (ora && str) {
			LOGGER[ora](str);

			res = forText([res, ora]);
		} else {
			LOGGER.stop();

			res = forText([res, 'stop']);
		}
	} else if (D && onlyWhat(only, 'log')) {
		if (str) {
			LOGGER[log](str);
		}

		res = forText([res, log]);
	}

	LOGGER = null;
	logOpts = null;

	return forText([LoggerNAME, res]);
}

exports = module.exports = twoLog;
exports.twoLog = twoLog;
exports.loggerStart = loggerStart;
exports.loggerText = loggerText;
exports.loggerStop = loggerStop;
exports.oneOra = oneOra;
exports._UNLOCK = _UNLOCK;
exports.default = twoLog;
