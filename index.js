'use strict';



var isNumber = require('is-number');



module.exports = {
	ok:    ok,
	email: checkEmail,
	type:  isType,
	empty: isEmpty
};



function isEmpty (obj){

	return (Object.getOwnPropertyNames(obj).length === 0);
};



function ok (arg){

	switch (Object.prototype.toString.call(arg)){
		case '[object Array]': 
			return arg.length < 1 ? false : ok(arg[0]) ? true : false;
		case '[object Object]':
			return isEmpty(arg) ? false : true;
		case '[object Null]':
			return false;
		case '[object Undefined]':
			return false;
		case '[object Number]':
			return isNumber(arg);
		case '[object String]':
			return true;
		case '[object Boolean]':
			return arg;
		case '[object Function]':
			return ok(arg());
		default:
			return true;
	}
};



function isType (arg, type){

	var classType = Object.prototype.toString.call(arg).match(/\s[a-zA-Z]+/)[0].trim();

	if(type.toLowerCase() === 'number'){
		return isNumber(arg);
	}else{
		return classType.toLowerCase() === type.toLowerCase() ? true : false;
	};
}



function checkEmail (email, regexp){

	if(ok(email)){
		var myRegexp = isType(regexp, 'regexp') ? regexp : /\S+@\S+\.\S+/;
		var result   = myRegexp.test(email);
		return result;
	}else{
		return false;
	};
};