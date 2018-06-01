# two-log [![Build Status](https://travis-ci.org/chinanf-boy/two-log.svg?branch=master)](https://travis-ci.org/chinanf-boy/two-log) [![codecov](https://codecov.io/gh/chinanf-boy/two-log/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/two-log?branch=master) [![explain](http://llever.com/explain.svg)](https://github.com/chinanf-boy/two-log-explain)

> ora and winston , just two logger, if debug

[中文](./readme.md) | ~~[english](./readme.en.md)~~

## DEMO

```
npm i -g two-log
```

![demo-two-log](./imgs/demo1.gif)
![demo-two-log-D](./imgs/demo2.gif)

## Usage

```js
// cli.js
const { twoLog, loggerStart, loggerText, loggerStop } = require('two-log');

let debug = false;
let l = twoLog(debug); // false => ora, true => winston

l.start(`hello there debug:${D} , then use ${useWhat}`, {
	ora: 'red',
	log: 'error',
});

let t = 5000;

setTimeout(() => {
	l.text(`ora:green, log:info and ${t} i will stop `, {
		ora: 'green',
		log: 'info',
	});
	l.one('just show one time ora');
}, t - 3000);

setTimeout(() => {
	l.stop(`${t}ms , ok i fail if ora `, { ora: 'fail', log: 'debug' });
}, t);
```

### l.start === loggerStart

### l.text === loggerText

### l.stop === loggerStop

### l.one === oneOra

> logger\*\*\* 是给其他 模块使用

---

## API

### twoLog(debug, userUser):log

#### debug

| name: | debug             |
| ----- | ----------------- |
| Type: | `boolean`         |
| Desc: | debug for two log |

#### userUse(api)

| name:    | userUse                        |
| -------- | ------------------------------ |
| Type:    | `function(api)`                |
| Default: | `undefined`                    |
| Desc:    | reset winston options for user |

##### api

| name:       | api             |
| ----------- | --------------- |
| Type:       | `object`        |
| Desc:       | api for user    |
| api.log:    | log === winston |
| api.setLog: | winston options |

<details>

<summary>
api examples
</summary>

```js
let userUse = api => {
	let winston = api.log;
	let wopts = {
		level: 'info',
	};
	api.setLog(wopts);
};

let l = log(true, userUse);
// winston level change
```

two-log default winston options

```js
let defaultWinston = {
	level: 'debug',
	transports: [
		new winston.transports.Console({
			datePattern: '.yyyy-MM-ddTHH-mm',
			colorize: true,
		}),
		new winston.transports.File({
			filename: `${pkg.name}.log`,
			handleExceptions: true,
			maxsize: 52000,
			maxFiles: 1,
			level: 'info',
			colorize: true,
		}),
	],
};
```

</details>

---

### log

| name:    | log                     |
| -------- | ----------------------- |
| Type:    | `any`                   |
| Desc:    | log api                 |
| Default: | `{ start, text, stop }` |
| Details: | `start === loggerStart` |
| Details: | `text === loggerText`   |
| Details: | `stop === loggerStop`   |
| Details: | `one === oneOra`        |

---

### loggerStart(str, options)

#### str

| name: | str      |
| ----- | -------- |
| Type: | `string` |
| Desc: | log text |

#### options

| name:        | options                         |
| ------------ | ------------------------------- |
| Type:        | `any`                           |
| Default:     | `{ ora: 'yellow', log: 'log' }` |
| Desc:        | log text                        |
| options.ora: | ora color                       |
| options.log: | winston show log level          |

### loggerText(str, options)

#### str

| name: | str      |
| ----- | -------- |
| Type: | `string` |
| Desc: | log text |

#### options

| name:        | options                         |
| ------------ | ------------------------------- |
| Type:        | `any`                           |
| Default:     | `{ ora: 'yellow', log: 'log' }` |
| Desc:        | log text                        |
| options.ora: | ora color                       |
| options.log: | winston show log level          |

### loggerStop(str, options)

#### str

| name: | str      |
| ----- | -------- |
| Type: | `string` |
| Desc: | log text |

#### options

| name:        | options                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| Type:        | `any`                                                                    |
| Default:     | `{ ora: '', log: 'log' }`                                                |
| Desc:        | log text                                                                 |
| options.ora: | ora {`fail\|succeed\|warn`} https://github.com/sindresorhus/ora#instance |
| options.log: | winston show log level                                                   |

### oneOra(str, options)

#### str

| name: | str      |
| ----- | -------- |
| Type: | `string` |
| Desc: | ora text |

#### options

| name:          | options                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| Type:          | `any`                                                                    |
| Default:       | `{ color: 'yellow', end: 'succeed' }`                                    |
| Desc:          | log text                                                                 |
| options.end:   | end {`fail\|succeed\|warn`} https://github.com/sindresorhus/ora#instance |
| options.color: | color                                                                    |

---

## CLI

> just Demo

```
npm install --global two-log
```

```
$ two-log --help

	Usage
	  $ two-log -D

	Options
	  -D  Debug [Default: false]

	Examples
	  $ two-log
	  ora show
	  $ two-log -D
	  winston show
```

## use by

- [node-modules-size](https://github.com/chinanf-boy/node-modules-size) show node_modules hole size

## License

MIT © [chinanf-boy](http://llever.com)
