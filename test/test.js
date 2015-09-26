const chai = require('chai');
const itr = require('../index.js');

const assert = chai.assert;
const expect = chai.expect;

const cycle = itr.cycle;
const distinct = itr.distinct;
const repeat = itr.repeat;
const cartesianProduct = itr.cartesianProduct;
const slices = itr.slices;
const takeNth = itr.takeNth;

describe('cycle()', function () {
    it('cycle through the array', function () {
        var arr = [];
        cycle([1,2,3], 5, function(item) {
            arr.push(item);
        });

        expect([1,2,3,1,2]).to.eql(arr);
    });
});

describe('distinct()', function() {
    it('iterates over unencountered elements', function(){
        var arr = [];
        distinct([1,1,2,3], function(item) {
            arr.push(item);
        });

        expect([1,2,3]).to.eql(arr);
    })
});

describe('cartesianProduct()', function () {
    it('cartesian product pairs', function () {
        var arr = [];
        cartesianProduct([1,2], [3,4], function(a,b) {
            arr.push(a*b);
        });

        expect([3,4,6,8]).to.eql(arr);
    });
});

describe('repeat()', function() {
    it('repeat the correct number of times', function() {
        var arr = [];
        repeat(5, function() {
            arr.push(42);
        });

        expect([42,42,42,42,42]).to.eql(arr);
    });
});

describe('slices()', function () {
    it('array slices at the right intervals', function () {
        var arr = [];
        slices([1,2,3,4,5,6], 2, function(slice) {
            arr.push(slice);
        });

        expect([[1,2],[3,4],[5,6]]).to.eql(arr);
    });
});

describe('takeNth()', function() {
    it('every nth element', function() {
        var arr = [];
        takeNth([1,2,3,4,5], 2, function(item) {
            arr.push(item);
        });

        expect([2,4]).to.eql(arr);
    });
});
