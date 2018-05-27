'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
}); // es6 export default
const winston = require('winston');
const Ora = require('ora');

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
			filename: 'translate-info.log',
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
exports.default = (debug = false, userUse) => {
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

	function start() {
		return loggerStart(...arguments);
	}
	function text() {
		return loggerText(...arguments);
	}
	function stop() {
		return loggerStop(...arguments);
	}

	return {
		start,
		text,
		stop,
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

exports.loggerStart = loggerStart;
exports.loggerText = loggerText;
exports.loggerStop = loggerStop;
exports._UNLOCK = _UNLOCK;

/**
 * @description start logger
 * @param {string} str
 * @param {string} options.ora ora color
 * @param {string} options.log winston log level
 */
function loggerStart(str, options = { ora: 'yellow', log: 'log' }) {
	logOpts = logOpts ? logOpts : defaultWinston;

	let { ora, log } = options;
	let res = ' '; // for test

	if (!D) {
		LOGGER = Ora(str).start();
		LOGGER.color = ora;

		res += 'start'; // for test
	} else {
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
 */
function loggerText(str, options = { ora: 'yellow', log: 'log' }) {
	if (!LOGGER) {
		return false;
	}
	let { ora, log } = options;

	let res = ' '; // for test

	if (!D) {
		LOGGER.text = str;
		LOGGER.color = ora;

		res += 'text'; // for test
	} else {
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
 */
function loggerStop(str, options = { ora: '', log: 'log' }) {
	if (!LOGGER) {
		return false;
	}
	let { ora, log } = options;

	let res = ' '; // for test

	if (!D) {
		if (ora && str) {
			LOGGER[ora](str);
			res += ora; // for test
		} else {
			LOGGER.stop();
			res += 'stop'; // for test
		}
	} else {
		if (str) {
			LOGGER[log](str);
		}
		res += log; // for test
	}

	LOGGER = null;
	logOpts = null;

	return LoggerNAME + res; // for test
}
