const chai = require('chai');
const itr = require('../iterators.js');

const assert = chai.assert;
const expect = chai.expect;

const cycle = itr.cycle;
const count = itr.count;
const distinct = itr.distinct;
const cartesianProduct = itr.cartesianProduct;
const groupBy = itr.groupBy;
const imap = itr.imap;
const iterate = itr.iterate;
const slices = itr.slices;
const subsets = itr.subsets;
const takeNth = itr.takeNth;
const takeStrict = itr.takeStrict;
const times = itr.times;

// count

describe('count()', function () {
    it('iterates from start to end with the specified step', function() {
        var arr = [];
        count(10, 20, 2, function(i) {
            arr.push(i);
        });

        expect(arr).to.eql([10,12,14,16,18]);
    });

    it('iterates from start to end with the default values when unspecified', function() {
        var arr = [];
        count(undefined, 5, undefined, function(i) {
            arr.push(i);
        });

        expect(arr).to.eql([0,1,2,3,4]);
    });
});

// cycle

describe('cycle()', function () {
    it('cycle through the array', function () {
        var arr = [];
        cycle([1,2,3], 5, function(item) {
            arr.push(item);
        });

        expect(arr).to.eql([1,2,3,1,2]);
    });
});

// distinct

describe('distinct()', function() {
    it('iterates over unencountered elements', function(){
        var arr = [];
        distinct([1,1,2,3], function(item) {
            arr.push(item);
        });

        expect(arr).to.eql([1,2,3]);
    })
});

// cartesianProduct

describe('cartesianProduct()', function () {
    it('cartesian product pairs', function () {
        var arr = [];
        cartesianProduct([1,2], [3,4], function(pair) {
            arr.push(pair[0] * pair[1]);
        });

        expect(arr).to.eql([3,4,6,8]);
    });
});

// groupBy

describe('groupBy()', function () {
    it('group elements that share the same result from applying the function', function () {
        var arr = groupBy(
            ['abc', 'foo', 'bar', 'gooey', 'gui', 'boo', 'Foo'],
            function(s) {
                return s.charAt(0).toLowerCase();
            }
        );

        expect(arr).to.eql([
            [ 'abc' ],
            [ 'foo', 'Foo' ],
            [ 'bar', 'boo' ],
            [ 'gooey', 'gui' ]
        ]);
    });
});

// imap

describe('imap()', function () {
    var square = function(x) {
        return Math.pow(x, 2);
    };

    var squareRoot = function(x) {
        return Math.pow(x, 1/2);
    };

    var sum = function(a,b,c) {
        return a + b + c;
    };

    it('applies the function to each element in the arrays and returns an array of results', function () {
        var arr = imap(function(a,b) {
            return squareRoot((square(a) + square(b)));
        }, null, [2,3,8], [0,4,6]);

        expect(arr).to.eql([2,5,10]);
    });

    it('applies the function to each element in the arrays and returns an array of results (more than 2 arrays)', function () {
        var arr = imap(sum, null, [2,3,8], [0,4,6], [1,3,10]);
        expect(arr).to.eql([3,10,24]);
    });
});

// iterate

describe('iterate()', function () {
    var obj = {
        multiplier: 10
    };

    it('successively applies the function to the value the correct number of times with the right context', function () {
        var numTimes = 5;
        var arr = iterate(1, numTimes, function(value) {
            return value * this.multiplier;
        }, obj);

        expect(arr).to.eql([1,10,100,1000,10000]);
    });
});

// slices

describe('slices()', function () {
    it('array slices at the right intervals', function () {
        var arr = [];
        slices([1,2,3,4,5,6], 2, function(slice) {
            arr.push(slice);
        });

        expect(arr).to.eql([[1,2],[3,4],[5,6]]);
    });

    it('array slices at the right intervals when the array does not split "evenly"', function () {
        var arr = [];
        slices([1,2,3,4,5], 2, function(slice) {
            arr.push(slice);
        });

        expect([[1,2],[3,4],[5]]).to.eql(arr);
    });
});

// subsets

describe('subsets()', function () {
    it('generates all subsets', function () {
        var arr = [];
        subsets([1,2,3], function(e) {
            arr.push(e)
        }, null);

        arr.sort(function(a,b) {
            return a.length - b.length;
        });

        expect(arr).to.eql([[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]);
    });

    it('generates subsets of the correct size', function () {
        var arr = [];
        subsets([1,2,3,4], function(e) {
            arr.push(e)
        }, null, 2);

        arr.sort(function(a,b) {
            return a[0] - b[0];
        });

        expect(arr).to.eql([[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]])
    });
});

// takeNth

describe('takeNth()', function() {
    it('takes every nth element', function() {
        var arr = [];
        takeNth([1,2,3,4,5], 2, function(item) {
            arr.push(item);
        });

        expect(arr).to.eql([2,4]);
    });
});

// takeStrict

describe('takeStrict()', function() {
    it('takes first 5 elements because at least 5 elements exist', function() {
        var arr = takeStrict([1,2,3,4,5], 5);
        expect(arr).to.eql([1,2,3,4,5]);
    });

    it('takes last 5 elements because at least 5 elements exist', function() {
        var reversed = true;
        var arr = takeStrict([1,2,3,4,5,6,10], 5, reversed);
        expect(arr).to.eql([3,4,5,6,10]);
    });

    it('throws an error if not enough elements exist, and throws before returning any value', function() {
        var reversed = true;
        var arr = [42];
        var errorCaught = false;

        try {
            arr = takeStrict([1,2,3], 4, reversed);
        } catch (err) {
            errorCaught = true;
        }

        expect(errorCaught).to.equal(true);
        expect(arr).to.eql([42]);
    });
});

// times

describe('times()', function() {
    it('repeat the correct number of times, with the right index in the callback', function() {
        var arr = [];
        var idxs = [];

        times(5, function(idx) {
            arr.push(42);
            idxs.push(idx);
        });

        expect(arr).to.eql([42,42,42,42,42]);
        expect(idxs).to.eql([0,1,2,3,4]);
    });

    it('repeat the correct number of times including the step', function() {
        var arr = [];
        var context = null;
        var step = 2;

        times(5, function() {
            arr.push(42);
        }, context, step);

        expect(arr).to.eql([42,42,42]);
    });

    it('executes the function 0 times if the number of times is negative', function() {
        var arr = null;
        times(-10, function() {
            arr.push(42);
        });

        expect(arr).to.equal(null);
    });
});
