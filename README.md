# torf

[![Build Status](https://travis-ci.org/besarthoxhaj/torf.svg?branch=master)](https://travis-ci.org/besarthoxhaj/torf) 
[![Code Climate](https://codeclimate.com/github/besarthoxhaj/torf/badges/gpa.svg)](https://codeclimate.com/github/besarthoxhaj/torf) 
[![Test Coverage](https://codeclimate.com/github/besarthoxhaj/torf/badges/coverage.svg)](https://codeclimate.com/github/besarthoxhaj/torf) 
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/besarthoxhaj/torf/issues)


Small library for cheking if a variable is ***ok***.

	npm install torf --save

For readability I suggest to save the module in a variable called `is`.

##is.ok();

This method simply checks if a variable is ***ok*** in general terms. ***Is ok*** means that a variable is defined and in case it is an object (or array) that it is not empty or the content is not undifined or null. 

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
```

You can pass functions as well. In that case the function will be invoked and the test will be performed on what the function returns.

```js
is.ok(function(){});                    // false
is.ok(function(){return NaN;});         // false
is.ok(function(){return false;});       // false
is.ok(function(){return null;});        // false
is.ok(function(){return Infinity;});    // false
is.ok(function(){return undefined;});   // false
is.ok(function(){return [undefined];}); // false
```

This is done recursively, which means it is possible to nest functions.

```js
is.ok(function(){ return function(){ return false;}}); // false
is.ok(function(){ return function(){ return true;}});  // true
```


##is.type();

This method simply checks the first argument class or primitive value against the second argument.

```js
var is = require('torf');

is.type('string', 'string'); // true
is.type(['fooo'], 'array');  // true
is.type({a:'hi'}, 'string'); // false
```

It is possible to pass an array of classes as second argument, in which case it will return true if one of the classes is matched.

```js
var is = require('torf');

is.type('string', ['string', 'number', 'object']); // true
is.type(['fooo'], ['null', 'array', 'date']);      // true
is.type({a:'hi'}, ['string', 'number', 'array']);  // false
```


The comparison is done by calling the `Object.prototype.toString()` to detect object class so it's possible
to test alse `undefined === null`.

```js
is.type(undefined, 'null');  // false
is.type(null, 'null');       // true
```


##is.email();

Internally it uses a regular expression `/\S+@\S+\.\S+/` which is pretty ***generous***. If you need more restriction I suggest to look at the second example.

```js
var is = require('torf');

is.email('foo@bar.com');      // true;
is.email('foo.zoo@bar.com');  // true;
is.email('foo.zoo@bar');      // false;
is.email(null);               // false;
is.email(undefined);          // false;

```

Optionally you can pass a regular expression to check against as second parameter.

```js
var is = require('torf');

is.email('foo@bar.com', new RegExp(/[\s\S]/));  // true

```