(function (register) {
  'use strict';

  var slice = [].slice;
  var isArray = Array.isArray;

  var noop = function () {};
  var identity = function (value) { return value; };

  var isDefined = function (value) {
    return typeof value !== 'undefined';
  };

  var iterateArray = function (iteratee, list) {
    for (var index = 0, length = list.length; index < length; index++) {
      var exit = iteratee(list[index], index);
      if (isDefined(exit)) { return exit; }
    }
  };

  var iterateObject = function (iteratee, list) {
    for (var index in list) {
      var exit = iteratee(list[index], index);
      if (isDefined(exit)) { return exit; }
    }
  };

  var iterate = function (iteratee, list) {
    if (isArray(list)) { return iterateArray(iteratee, list); }
    return iterateObject(iteratee, list);
  };

  var extend = function (object, source) {
    iterate(function (item, index) {
      object[index] = item;
    }, source);

    return object;
  };

  var reduce = function (iteratee, acc, list) {
    iterate(function (item, index) {
      acc = iteratee(acc, item, index);
    }, list);

    return acc;
  };

  var map = function (iteratee, list) {
    return reduce(function (acc, item, index) {
      acc[index] = iteratee(item, index);
      return acc;
    }, isArray(list) ? [] : {}, list);
  };

  var filter = function (predicate, list) {
    var listIsArray = isArray(list);

    return reduce(function (acc, item, index) {
      if (!predicate(item, index)) { return acc; }
      acc[listIsArray ? acc.length : index] = item;
      return acc;
    }, listIsArray ? [] : {}, list);
  };

  var partial = function (fn /*, args... */) {
    var args = slice.call(arguments, 1);

    return function () {
      return fn.apply(null, args.concat(slice.call(arguments)));
    };
  };

  var merge = function (/* objects... */) {
    var objects = slice.call(arguments);
    return reduce(extend, {}, objects);
  };

  register({

    // list
    nglReduce: reduce,
    nglMap: map,
    nglFilter: filter,

    // function
    nglPartial: partial,

    // lang
    nglMerge: merge,
    nglCopy: merge,

    // util
    nglNoop: noop,
    nglIdentity: identity
  });

})(function register (api) {
  'use strict';

  var mod = angular.module('ngl.fp', []);

  var registerFactory = function (method) {
    mod.factory(method, function () {
      return api[method];
    });
  };

  for (var index in api) { registerFactory(index); }
});
