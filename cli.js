#!/usr/bin/env node
'use strict';
const meow = require('meow');
const twoLog = require('.');

const cli = meow(`
	Usage
	  $ two-log [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ two-log
	  unicorns & rainbows
	  $ two-log ponies
	  ponies & rainbows
`);

console.log(twoLog(cli.input[0] || 'unicorns'));
