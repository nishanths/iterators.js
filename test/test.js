var chai = require('chai');
var itr = require('../index.js');

var assert = chai.assert;
var expect = chai.expect;

var slices = itr.slices;
var product = itr.product;
var cycle = itr.cycle;

describe('slices()', function () {
    it('array slices at the right intervals', function () {
        var arr = [];
        slices([1,2,3,4,5,6], 2, function(slice) {
            arr.push(slice);
        });

        expect([[1,2],[3,4],[5,6]]).to.eql(arr);
    });
});

describe('product()', function () {
    it('cartesian product pairs', function () {
        var arr = [];
        product([1,2], [3,4], function(a,b) {
            arr.push(a*b);
        });

        expect([3,4,6,8]).to.eql(arr);
    });
});

describe('cycle()', function () {
    it('cycle through the array', function () {
        var arr = [];
        cycle([1,2,3], 5, function(item) {
            arr.push(item);
        });

        expect([1,2,3,1,2]).to.eql(arr);
    });
});

