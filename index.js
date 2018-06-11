'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
}); // es6 export default
const winston = require('winston');
const Ora = require('ora');

const pkgName = require('get-module-name').sync();

// two-log
let D = false; // default no debug
let LOGGER = null; // main
let LOCK = false; // only one set debug
let LoggerNAME = 'ora'; // for test

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
	let { color, end } = Object.assign(
		{ color: 'yellow', end: 'succeed' },
		options
	);

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

	let { ora, log, only } = Object.assign(
		{ ora: 'yellow', log: 'debug' },
		options
	);
	let res = ' '; // for test

	if (!D && (!only || only == 'ora')) {
		LOGGER = Ora(str).start();
		LOGGER.color = ora;

		res += 'start'; // for test
	} else if (D && (!only || only == 'log')) {
		LOGGER = new winston.Logger(logOpts);
		LOGGER[log](str);

		res += log; // for test
	}

	return LoggerNAME + res; // for test
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
	let { ora, log, only } = Object.assign(
		{ ora: 'yellow', log: 'debug' },
		options
	);

	let res = ' '; // for test

	if (!D && (!only || only == 'ora')) {
		LOGGER.text = str;
		LOGGER.color = ora;

		res += 'text'; // for test
	} else if (D && (!only || only == 'log')) {
		LOGGER[log](str);
		res += log; // for test
	}
	return LoggerNAME + res; // for test
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
	let { ora, log, only } = Object.assign({ ora: '', log: 'debug' }, options);

	let res = ' '; // for test

	if (!D && (!only || only == 'ora')) {
		if (ora && str) {
			LOGGER[ora](str);
			res += ora; // for test
		} else {
			LOGGER.stop();
			res += 'stop'; // for test
		}
	} else if (D && (!only || only == 'log')) {
		if (str) {
			LOGGER[log](str);
		}
		res += log; // for test
	}

	LOGGER = null;
	logOpts = null;

	return LoggerNAME + res; // for test
}

exports.twoLog = twoLog;
exports.loggerStart = loggerStart;
exports.loggerText = loggerText;
exports.loggerStop = loggerStop;
exports.oneOra = oneOra;
exports._UNLOCK = _UNLOCK;
exports.default = twoLog;
