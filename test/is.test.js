'use strict';


var root   = __dirname + '/../';
var expect = require('chai').expect;
var is     = require(root + 'index');


var shouldPassOk = [
	[1],
	['bes'],
	{'bes':'foo'},
	[{'bes':'foo'}],
	new Date(),
	true,
	function(){return true;},
	function(){return ['bes'];},
	function(){return {'bes':'foo'};},
	function(){return [{'bes':'foo'}];},
	function(){return function(){return true;};}
];


var shouldPassType = [
	[/\S+@\S+\.\S+/, 'regexp'],
	[null, 'null'],
	[undefined, 'undefined'],
	['string', 'string'],
	[['bes'], 'array'],
	[{'bes':'foo'}, 'object'],
	[new Date(), 'date'],
	[true, 'boolean'],
	[function(){return true;}, 'function'],
	[25, 'number']
];


var shouldFailOk = [
	[],
	{},
	[[]],
	[{}],
	[[{}]],
	NaN,
	null,
	Infinity,
	undefined,
	[NaN],
	[null],
	[false],
	[Infinity],
	[undefined],
	function(){},
	function(){return NaN;},
	function(){return null;},
	function(){return false;},
	function(){return Infinity;},
	function(){return undefined;},
	function(){return [undefined];},
	function(){return function(){return false;};}
];


var shouldFailType = [
	[null, 'undefined'],
	[undefined, 'array'],
	['string', 'object'],
	[['bes'], 'string'],
	[{'bes':'foo'}, 'array'],
	[new Date(), 'boolean'],
	[true, 'date'],
	[function(){return true;}, 'Math'],
	[Infinity, 'number'],
	[2, 'randomString'],
	[{}, 'randomString']
];


describe('#is.ok()', function (){

	shouldPassOk.forEach(function (elm){

		it('"' + JSON.stringify(elm) + '" should return TRUE', function (){

			expect(is.ok(elm)).to.equal(true);
		});
	});


	shouldFailOk.forEach(function (elm){

		it('"' + JSON.stringify(elm) + '" should return FALSE', function (){

			expect(is.ok(elm)).to.equal(false);
		});
	});
});



describe('#is.email()', function (){

	it('should return TRUE for foo@bar.com', function (){

		expect(is.email('foo@bar.com')).to.equal(true);
	});


	it('should return TRUE for foo@bar.com', function (){

		expect(is.email('foo@bar.com', new RegExp(/[\s\S]/))).to.equal(true);
	});


	it('should return FALSE for null', function (){

		expect(is.email(null)).to.equal(false);
	});


	it('should return FALSE for foo.zoo@bar', function (){

		expect(is.email('foo.zoo@bar')).to.equal(false);
	});


	it('should return FALSE for null', function (){

		expect(is.email(null)).to.equal(false);
	});
});



describe('#is.empty()', function (){

	it('should return TRUE for "{}"', function (){

		expect(is.empty({})).to.equal(true);
	});
});


describe('#is.type()', function (){

	shouldPassType.forEach(function (elm){

		it('"' + JSON.stringify(elm) + '" should return TRUE', function (){

			expect(is.type.apply(null, elm)).to.equal(true);
		});
	});



	shouldFailType.forEach(function (elm){

		it('"' + JSON.stringify(elm) + '" should return FALSE', function (){

			expect(is.type.apply(null, elm)).to.equal(false);
		});
	});
});