ngl.fp
======

Functional Programming helpers for Angular 1.x

Usage
-----

```js
var multiply = function (x, y) { return x * y };
var mult2 = partial(multiply, 2);
var double = partial(map, mult2);
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

### `nglReduce(iteratee, acc, list) -> acc`

Returns a new value created by applying `iteratee` to each `list` item with
a provided accumulator (`acc`)

```js
var sum = function (a, b) { return a + b; };
var numbers = [ 1, 2, 3, 4 ];
nglReduce(sum, 0, numbers) // 10
```

### `nglMap(iteratee, list) -> list`

Returns a new list created by applying `iteratee` to each `list` item

```js
var double = function (int) { return 2 * int; };
var numbers = [ 1, 2, 3, 4 ];
nglMap(double, numbers) // [ 2, 4, 6, 8 ]
```

### `nglFilter(predicate, list) -> list`

Returns a new list with the items which return true once `predicate` is applied
to them

```js
var even = function (int) { return int % 2 === 0; };
var numbers = [ 1, 2, 3, 4 ];
nglFilter(even, numbers) // [ 2, 4 ]
```

### `nglPartial(fn, args...) -> function`

Returns a new function created by applying `fn` to the provided partial `args`

```js
var multiply = function (x, y) { return x * y };
var mult2 = nglPartial(multiply, 2);
mult2(5) // 10
```

### `nglMerge(objects...) -> object`

Returns a new object created by shallow merging left to right the provided
objects

```js
var foo = { x: 10, y: 20 };
var bar = nglMerge(foo, { x: 1, z: 2 });
bar // { x: 1, y: 20, z: 2 }
foo === bar // false
```

### `nglCopy(object) -> object`

(Alias of `nglMerge`)

Returns a new object created by shallow copying the provided object

```js
var foo = { x: 10, y: 20 };
var bar = nglCopy(foo);
bar // { x: 10, y: 20 }
foo === bar // false
```
