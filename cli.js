#!/usr/bin/env node
'use strict';
const meow = require('meow');
const { twoLog } = require('./index');

const cli = meow(`
	Usage
	  $ two-log -D

	Options
	  -D  Debug [Default: false]

	Examples
	  $ two-log
	  ora show
	  $ two-log -D
	  winston show
`);
let D = cli.flags['D'] ? true : false;

let l = twoLog(D);

let useWhat = !D ? 'ora' : 'winston';

l.start(`hello there debug:${D} , then use ${useWhat}`, {
	ora: 'red',
	log: 'error',
});

let t = 5000;

setTimeout(() => {
	l.text(`ora:green, log:debug and ${t} i will stop `, {
		ora: 'green',
	});

	l.one('just show one time ora');
}, t - 3000);

setTimeout(() => {
	l.text(`ora:green, log:debug and ${t} only show log style `, {
		ora: 'green',
		only: 'log',
	});
}, t - 2000);

setTimeout(() => {
	l.stop(`${t}ms , ok i fail if ora `, { ora: 'fail', log: 'debug' });
}, t);
