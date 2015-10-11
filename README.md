# [iterators.js](./)

Useful functional iterators. 

Inspired by [JuliaLang/Iterators.jl](https://github.com/JuliaLang/Iterators.jl). 

![npm ver](https://img.shields.io/npm/v/iterators.js.svg) ![downloads total](https://img.shields.io/npm/dt/iterators.js.svg) ![travis ci](https://img.shields.io/travis/nishanths/iterators.js.svg) ![license](https://img.shields.io/npm/l/iterators.js.svg)

iterators.js has no dependencies. Tests are available in the `tests/` directory. Run `npm test` or `mocha` to execute tests.

**Warning:** iterators.js requires some ES6 features such as [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

# Contents

* [Install](#install)
* [Usage](#usage)
* [Examples](#examples)
* [Functions](#functions)
* [Contributing](#contributing)
* [License](#license)

# Install

iterators.js is available on [npm](). Installing is simple. Simply add it to your project by running:

````bash
$ npm install --save iterators.js
````

To install globally, run: (you may need to use sudo)

````bash
$ npm install -g iterators.js
````

Alternatively, grab a [zip file](https://github.com/nishanths/iterators.js/archive/master.zip) of the repository.

# Usage

In your JavaScript, `require` iterators.js.

````js
// index.js

var itr = require('iterators.js');

itr.distinct([1, 2, 1, 2, 3], function(item) {
  console.log(item);
});

````

Back at the terminal:

````bash
$ node index.js
1
2
3
````

# Examples

The [tests/](https://github.com/nishanths/iterators.js/tree/master/test) directory is a great place for in-depth examples.

* **cycle()** – cycle over the elements of an array

````
itr.cycle([1,2,3], 5, function(item) {
    console.log(item)
});

// 1
// 2
// 3
// 1
// 2
````

* **distinct()** – iterate only over unencountered elements

````js
itr.distinct([1,1,2,3], function(item) {
    console.log(item);
});

// 1
// 2
// 3
````

* **cartesianProduct()** - generate cartesian product pairs

````js
itr.cartesianProduct([1,2], [3,4], function(a, b) {
    console.log(a * b);
});

// 3
// 4
// 6
// 8
````

* **groupBy()** – group elements into arrays depending on the result from applying the specified function

````js
var firstChar = function(str) { return str.charAt(0); };
var arr = itr.groupBy(['abc', 'foo', 'gooey', 'gui'], firstChar);

console.log(arr); // [ [ 'abc' ], [ 'foo' ], [ 'gooey', 'gui' ] ]
````

* **subsets()** – iterate subsets (optionally specify a size, defaults to subsets of all sizes when null)

````js
var arr = [];
var context = null;
var size = null;

itr.subsets([1,2,3], function(e) {
    arr.push(e)
}, context, size);

arr.sort(function(a,b) {
    return a.length - b.length;
});

console.log(arr); // [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
````

* **takeNth()** – iterate over every nth element

````js
itr.takeNth([1,2,3,4,5], 2, function(item) {
    console.log(item);
});

// 2
// 4
````

* **takeStrict()** – take n elements only if at least n elements exists, oherwise throw an Error.

````js
var reversed = true;
var arr = itr.takeStrict([1,2,3,4,5,6,10], 5, reversed);
console.log(arr); // [3,4,5,6,10]
````
        
* **times()** – repeatedly call a function

````js
var arr = [];
var idxs = [];

itr.times(5, function(idx) {
    arr.push(42);
    idxs.push(idx);
});

console.log(arr); // [42,42,42,42,42]
console.log(idxs); // [0,1,2,3,4]
````

# Functions

* cycle
* distinct
* cartesianProduct
* groupBy
* slices
* subsets
* takeNth
* takeStrict
* times

# Contributing

Pull requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request on GitHub

# License

[MIT](https://github.com/nishanths/iterators.js/blob/master/LICENSE).