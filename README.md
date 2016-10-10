morgan-debug
===

Morgan-debug is an express middleware which composes the [`morgan`](https://www.npmjs.org/package/morgan) logger middleware with the [`debug`](https://www.npmjs.org/package/debug) console output library for a consistent logging output with other library debug info.

```
npm install morgan debug morgan-debug
```

Note that `morgan` and `debug` are both peer dependencies and must be installed separately.

## Usage

**`morganDebug(namespace, format, [options]);`**

- `namespace` (string): The debug namespace or a debug function
- `format` (string): The morgan format string
- `options` (object): Optional options to pass through to morgan

```js
var express     = require('express');
var morganDebug = require('morgan-debug');

var app = express();
app.use(morganDebug('myapp', 'combined'));
```

See the respective libraries for details of their operation and options.
