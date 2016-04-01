(function (register) {
  'use strict';

  var slice = [].slice;
  var isArray = Array.isArray;

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
      return acc[index] = iteratee(item, index);
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
    nglCopy: merge
  });

})(function register (api) {
  'use strict';

  var fp = angular.module('fp', []);

  for (var method in api) {
    fp.factory(method, function () {
      return api[method];
    });
  }
});
