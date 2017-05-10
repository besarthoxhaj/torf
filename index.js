'use strict';

module.exports = {
  ok: ok,
  email: checkEmail,
  type: isType,
  empty: isEmpty
};

/**
 * [isEmpty description]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isEmpty (obj) {
  return (Object.getOwnPropertyNames(obj).length === 0);
}

/**
 * [ok description]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
function ok (arg) {
  switch (Object.prototype.toString.call(arg)) {
    case '[object Array]':
      return arg.length < 1 ? false : ok(arg[0]) ? true : false;
    case '[object Object]':
      return isEmpty(arg) ? false : true;
    case '[object Null]':
      return false;
    case '[object Undefined]':
      return false;
    case '[object Number]':
      return isFinite(arg);
    case '[object String]':
      return true;
    case '[object Boolean]':
      return arg;
    case '[object Function]':
      return ok(arg());
    default:
      return true;
  }
}

/**
 * [getClassName description]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
function getClassName (arg) {
  return Object.prototype.toString.call(arg).match(/\s[a-zA-Z]+/)[0].trim().toLowerCase();
}

/**
 * [isType description]
 * @param  {[type]}  arg  [description]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
function isType (arg, type) {
  return (function test(arg, type) {
    if(getClassName(type) === 'array'){
      if(getClassName(arg) === 'object' && type[0] === 'object'){
        return true;
      }else if(getClassName(arg) === type[0] && isFinite(arg)){
        return true;
      }else if(getClassName(type[0]) === 'undefined'){
        return false;
      }else{
        type.shift();
        return test(arg, type);
      }
    }else{
      if(getClassName(arg) === 'number' && type === 'number'){
        return isFinite(arg);
      }else{
        return getClassName(arg) === type;
      }
    }
  })(arg, type);
}

/**
 * [checkEmail description]
 * @param  {[type]} email  [description]
 * @param  {[type]} regexp [description]
 * @return {[type]}        [description]
 */
function checkEmail (email, regexp){
  if(ok(email)) {
    var myRegexp = isType(regexp, 'regexp') ? regexp : /\S+@\S+\.\S+/;
    var result = myRegexp.test(email);
    return result;
  }else{
    return false;
  }
}
