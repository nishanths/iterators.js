const chai = require('chai');
const itr = require('../iterators.js');

const assert = chai.assert;
const expect = chai.expect;

const cycle = itr.cycle;
const distinct = itr.distinct;
const cartesianProduct = itr.cartesianProduct;
const groupBy = itr.groupBy;
const slices = itr.slices;
const subsets = itr.subsets;
const takeNth = itr.takeNth;
const takeStrict = itr.takeStrict;
const times = itr.times;

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
        cartesianProduct([1,2], [3,4], function(a,b) {
            arr.push(a*b);
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
        reversed = true;
        var arr = takeStrict([1,2,3,4,5,6,10], 5, reversed);
        expect(arr).to.eql([3,4,5,6,10]);
    });

    it('throws an error if not enough elements exist, and throws before returning any value', function() {
        reversed = true;
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
