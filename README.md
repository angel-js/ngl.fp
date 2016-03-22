ngl.fp
======

Functional Programming helpers for Angular 1.x

Usage
-----

```js
var multiply = function (x, y) { return x * y };
var mult2 = fpPartial(multiply, 2);
var double = fpPartial(fpMap, mult2);
double([ 1, 2, 3, 4 ]); // [ 2, 4, 6, 8 ]
```

Install
-------

    bower install ngl.fp

Include the sources

```html
<script src="bower_components/ngl.fp/dist/fp.min.js"></script>
```

Add `ngl.fp` to your app dependencies

```js
angular.module('app', [ 'ngl.fp' ]);
```

API
---

### `fpPartial(fn, args...) -> fn`

Returns a function with `args...` partially aplied

```js
var multiply = function (x, y) { return x * y };
var mult2 = fpPartial(multiply, 2);
mult2(5) // 10
```

### `fpMap(fn, list) -> list`

Returns a new list created by applying `fn` to each `list` item

```js
var double = function (int) { return 2 * int; };
var numbers = [ 1, 2, 3, 4 ];
fpMap(double, numbers) // [ 2, 4, 6, 8 ]
```

### `fpReduce(fn, list) -> scalar`

Returns a scalar value created by applying `iteratee` to each `list` item with
an accumulator

```js
var sum = function (a, b) { return a + b; };
var numbers = [ 1, 2, 3, 4 ];
fpReduce(sum, 0, numbers) // 10
```

### `fpCopy(obj)`

Returns a new object created by shallow copying the provided object

```js
var x = {
  foo: 'abc',
  bar: [ 1, 2, 3 ]
};

var y = fpCopy(x);
x === y // false
x.bar === y.bar // true
```

### `fpMerge(objs...)`

Returns a new object created by shallow merging left to right the provided
objects

```js
var foo = { x: 10, y: 20 };
var bar = fpMerge(foo, { x: 1, z: 2 });
bar // { x: 1, y: 20, z: 2 }
foo === bar // false
```
