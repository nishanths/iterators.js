# iterators.js

Useful functional iterators. 

Inspired by [JuliaLang/Iterators.jl](https://github.com/JuliaLang/Iterators.jl). 

[![npm ver](https://img.shields.io/npm/v/iterators.js.svg)](https://www.npmjs.com/package/iterators.js) [![bower logo](https://img.shields.io/bower/v/iterators.js.svg)](http://bower.io/search/?q=iterators.js)  [![downloads total](https://img.shields.io/npm/dt/iterators.js.svg)](https://www.npmjs.com/package/iterators.js) [![travis ci](https://img.shields.io/travis/nishanths/iterators.js.svg)](https://travis-ci.org/nishanths/iterators.js)  [![license](https://img.shields.io/npm/l/iterators.js.svg)](https://github.com/nishanths/iterators.js/blob/master/LICENSE)

iterators.js is designed to be performant and to iterate as lazily as possible in most scenarios. It has no dependencies. Tests are available in the [`test/`](https://github.com/nishanths/iterators.js/tree/master/test) directory. Run `npm test` or `mocha` to execute tests.

It is available on [npm](https://www.npmjs.com/package/iterators.js), [bower](http://bower.io/search/?q=iterators.js), and directly via [RawGit](https://rawgit.com/nishanths/iterators.js/master/iterators.js). 

**Warning:** iterators.js requires some ES6 features such as [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

# Contents

* [Install](#install)
* [Usage](#usage)
* [Examples](#examples)
* [Functions](#functions)
* [Contributing](#contributing)
* [License](#license)

# Install

If you're using npm, simply add it to your project (and package.json) by running:

````bash
$ npm install --save iterators.js
````

If you're using bower, run:

````bash
$ bower install iterators.js
```` 

Direct link for browsers, minified:

````html
<script type="text/javascript" src="https://rawgit.com/nishanths/iterators.js/master/iterators.min.js"></script>
````

# Usage

iterators.js works well both in node and the browser.

#### Node

Require 'iterators.js' in your JS file:

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

#### Browser

Load it in your browser. Set the `src` for iterators.js to either a local copy (you can get it from bower) or to the online copy on GitHub (served via RawGit).

````html
<!-- index.html -->

<html>
<head>
  <title>Example</title>
</head>
<body>
  Hello, world
  <script type="text/javascript" src="https://rawgit.com/nishanths/iterators.js/master/iterators.min.js"></script>
  <script type="text/javascript" src="./main.js"></script>
</body>
</html>
````

Use the `itr` global to access functions.

````js
// main.js

console.log(itr); // Object {} 

itr.distinct([1, 2, 1, 2, 3], function(item) {
  console.log(item);
});

// 1
// 2
// 3
````

**Note on global variable conflicts:** The previous `itr` variable can be retrieved by running `itr.noConflict()`. The function resets the `itr` variable back to its original value and returns a reference to the iterators.js's itr object which you can assign to the variable of your choosing.

````js
var myItr = itr.noConflict(); 
// Previous itr is now restored
// myItr can be used to access iterator.js's library functions
````

# Examples

* **count()** – iterate from start to end (excluded) using the specified step

````js
var start = 10;
var end = 20;
var step = 2;

itr.count(start, end, step, function(item) {
    console.log(item);
});

// 10
// 12
// 14
// 16
// 18
````

* **cycle()** – cycle over the elements of an array

````js
itr.cycle([1,2,3], 5, function(item) {
    console.log(item);
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

* **cartesianProduct()** - iterate cartesian product pairs

````js
itr.cartesianProduct([1,2], [3,4], function(pair) {
    console.log(pair[0] * pair[1]);
});

// 3
// 4
// 6
// 8
````

* **groupBy()** – group elements into arrays depending on the result from applying the specified function

````js
var firstCharNormalizedCase = function(str) { return str.charAt(0).toLowerCase(); };
var arr = itr.groupBy(['abc', 'gooey', 'foo', 'Gui'], firstCharNormalizedCase);

console.log(arr); // [ [ 'abc' ], [ 'gooey', 'Gui' ], [ 'foo' ] ]
````

* **imap()** – applies a function to each element in the arrays and returns an array of results

````js
var self = null;
var sum = function(a,b,c) {
  return a + b + c;
};

var arr = itr.imap(sum, self, [2,3,8], [0,4,6], [1,3,10]);

console.log(arr); // [3,10,24]
````

* **iterate()** – successively applies a function to the value and returns an array of result

````js
var x = 2;
var numTimes = 3;

var arr = itr.iterate(x, numTimes, function(value) {
    return value * 10;
});

console.log(arr); // [2,20,200]
````

* **slices()** – iterate over slices each of size n; if the array does not slice "evenly", the last slice will have fewer elements

````js
itr.slices([1,2,3,4,5], 2, function(slice) {
    console.log(slice);
});

// [1,2]
// [3,4]
// [5]
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

* **takeStrict()** – take n elements only if at least n elements exists, oherwise throw an Error

````js
var reversed = true;
var arr = itr.takeStrict([1,2,3,4,5,6,10], 5, reversed);
console.log(arr); // [3,4,5,6,10]
````
        
* **times()** – repeatedly call a function; call infinitely if the number of times is omitted

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

* count
* cycle
* distinct
* cartesianProduct
* groupBy
* imap
* iterate
* slices
* subsets
* takeNth
* takeStrict
* times

# General notes

* The [`test/`](https://github.com/nishanths/iterators.js/tree/master/test) directory is a great place for in-depth examples.
* Functions also provide the option to specify a context (`this` value) for your callback function.

# Contributing

Pull requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request on GitHub

# License

[MIT](https://github.com/nishanths/iterators.js/blob/master/LICENSE).
