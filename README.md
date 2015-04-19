# torf

Small library for cheking if a variable is ***ok***.

	npm install --save

#is.ok();

```js
var is = require('torf');

is.ok([]);            // false
is.ok({});            // false
is.ok([{}]);          // false
is.ok(NaN);           // false
is.ok(null);          // false
is.ok(Infinity);      // false
is.ok(undefined);     // false
is.ok([NaN]);         // false
is.ok([null]);        // false
is.ok([Infinity]);    // false
is.ok([undefined]);   // false
is.ok(function (){});                    // false
is.ok(function (){return NaN;});         // false
is.ok(function (){return false;});       // false
is.ok(function (){return null;});        // false
is.ok(function (){return Infinity;});    // false
is.ok(function (){return undefined;});   // false
is.ok(function (){return [undefined];}); // false

is.ok(function (){return true;});        // TRUE!

// ...well you got it, right?
```

#is.email();

```js
var is = require('torf');

is.email('foo@bar.com');  // true;
is.email('foo.zoo@bar');  // false;
is.email(null);           // false;
is.email(undefined);      // false;

```

Optionally you can pass a regular expression to check against as second parameter.

```js
var is = require('torf');

is.email('foo@bar.com', new RegExp(/[\s\S]/));  // true

```

#is.type();

```js
var is = require('torf');

is.type('string', 'string'); // true
is.type(['fooo'], 'array');  // true
is.type(null, 'null');       // TRUE!
is.type({a:'hi'}, 'string'); // false
is.type(undefined, 'null');  // FALSE!
```