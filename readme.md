# two-log [![Build Status](https://travis-ci.org/chinanf-boy/two-log.svg?branch=master)](https://travis-ci.org/chinanf-boy/two-log) [![codecov](https://codecov.io/gh/chinanf-boy/two-log/badge.svg?branch=master)](https://codecov.io/gh/chinanf-boy/two-log?branch=master) [![explain](http://llever.com/explain.svg)](https://github.com/chinanf-boy/two-log-explain)

> ora and winston , just two logger, if debug

[中文](./readme.md) | ~~[english](./readme.en.md)~~

## Install

```
npm i -g two-log
```

## Usage

```js
const twoLog = require('two-log');

twoLog('unicorns');
//=> 'unicorns & rainbows'
```

## API

### twoLog(input, [options])

#### input

| name: | input        |
| ----- | ------------ |
| Type: | `string`     |
| Desc: | Lorem ipsum. |

#### options

##### foo

| name:    | foo          |
| -------- | ------------ |
| Type:    | `boolean`    |
| Default: | `false`      |
| Desc:    | Lorem ipsum. |

## CLI

```
npm install --global two-log
```

```
$ two-log --help

  Usage
    two-log [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ two-log
    unicorns & rainbows
    $ two-log ponies
    ponies & rainbows
```

## License

MIT © [chinanf-boy](http://llever.com)
