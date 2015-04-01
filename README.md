morgan-debug
===

Morgan-debug is an express middleware which composes the [morgan](https://www.npmjs.org/package/morgan) logger middleware with the [debug](https://www.npmjs.org/package/debug) console output library for a consistent logging output with other library debug outputs.

```
npm install morgan-debug
```

## Usage

**`morganDebug(namespace, format, [options]);`**

- `namespace` is the debug namespace or an instance of debug function
- `format` is the morgan format
- `options` is the options to be passed to morgan`

```js
var express     = require('express');
var morganDebug = require('morgan-debug');

var app = express();
app.use(morganDebug('myapp', 'combined'));
```

See the respective libraries for details of their operation and options.
