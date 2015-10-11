// iterators.js
// https://github.com/nishanths/iterators.js
// Licensed under the MIT License

var uniques_ = function(arr, fn, context) {
    var length = arr.length;
    var i;
    var seen = new Set();

    for (i = 0; i < length; i += 1) {
        if (!(seen.has(arr[i]))) {
            seen.add(arr[i]);
            fn.call(context, arr[i], i, arr);
        }
    }
};

var times_ = function(n, fn, context, step) {
    var i;
    var infinitely = (n == null) ? true : false;

    if (step == null) {
        step = 1;
    }

    if (infinitely) {
        i = 0;

        while (true) {
            fn.call(context, i);
            i += step;
        }
    } else {
        for (i = 0; i < n; i += step) {
            fn.call(context, i);
        }
    }
};

/**
 * Repeat a function call n times while cycling through an array.
 * The callback function receives 3 parameters: the element, the index of
 * the element, and the original array.
 *
 * @param  {Array}    arr      Array to cycle through
 * @param  {Number}   n        Number of times to call the function while cycling over elements
 * @param  {Function} fn       Function to call
 * @param  {*}        context  Optional context to call the function in
 */
var cycle = function(arr, n, fn, context) {
    var length = arr.length;
    var i = 0;

    while (n > 0) {
        n -= 1;
        fn.call(context, arr[i], i, arr);
        i = (i + 1) % length;
    }
};

/**
 * Call a function for each element in an array
 * only if the element has not been seen before.
 * Two elements are considered the same using the Same-value equality algorithm.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness.
 * The callback function receives 3 parameters: the element, the index of
 * the element, and the original array.
 *
 * @param  {Array}    arr       Array to iterate over
 * @param  {Function} fn        Function to call when an unencountered element is reached
 * @param  {*}        context   Optional context to call the function in
 */
var distinct = function(arr, fn, context) {
    return uniques_(arr, fn, context);
};

/**
 * Call a function while iterating over all combinations in the cartesian
 * product of the input array. The callback function receives 5 parameters: the
 * cartesian product pair, the iteration index of the first array, the iteration 
 * index of the second element, the first array, and the second array.
 *
 * @param  {Array}    arrA     First array to iterate over
 * @param  {Array}    arrB     Second array to iterate over
 * @param  {Function} fn       Function to call
 * @param  {*}        context  Optional context to call the function in
 */
var cartesianProduct = function(arrA, arrB, fn, context) {
    var i, j;
    var aLength = arrA.length;
    var bLength = arrB.length;

    for (i = 0; i < aLength; i += 1) {
        for (j = 0; j < bLength; j += 1) {
            fn.call(context, [arrA[i], arrB[j]], i, j, arrA, arrB);
        }
    }
};

/**
 * Group values in the array that share the same Strict equality result from
 * applying a provided function.
 *
 * @param  {Array}        arr      Array to iterate over
 * @param  {Function}     fn       Function to apply for grouping
 * @param  {*}            context  Optional context to execute the function index
 * @return {Array<Array>}          Array of arrays where each internal array is a group
 */
var groupBy = function(arr, fn, context) {
    var i;
    var length = arr.length;
    var ret = [];
    var current = null;
    var seen = new Set();
    var ArrayProtoPush = Array.prototype.push;

    var f = function(item, idx) {
        if ((!seen.has(idx)) &&
            (fn.call(context, item) === fn.call(context, arr[i]))) {
            seen.add(idx);
            return true;
        }

        return false;
    };

    for (i = 0; i < length; i += 1) {
        if (seen.has(i)) {
            continue;
        }

        seen.add(i);

        current = [];
        current.push(arr[i]);

        ArrayProtoPush.apply(current, arr.filter(f));

        ret.push(current);
        current = null;
    }

    return ret;
};

/**
 * Iterate over an array of slices generated from the original array, each
 * of size n. The last slice may have fewer elements than the previous slices.
 * The callback function receives 3 parameters: the current slice,
 * the number of slices so far, and the original array.
 *
 * @param  {Array}    arr          Array to create slices of size n from
 * @param  {Number}   n            Size of each slice
 * @param  {Function} fn           Function to call with each slice
 * @param  {*}        context      Optional context
 */
var slices = function(arr, n, fn, context) {
    var i;
    var times = Math.ceil(arr.length/n);
    var slice = null;

    for (i = 0; i < times; i += 1) {
        slice = arr.slice(i*n, (i+1)*n);
        fn.call(context, slice, i, arr);
        slice = null;
    };
};

/**
 * Iterate over subsets of size n generated from an array. 
 * If n is null or undefined, then subsets of all subsets are considered.
 * n is expected to be non-negative.
 * Non-unique elements are removed using Same-value equality algorithm.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness.
 * At each iteration, the callback function receives one parameter: the subset.
 * 
 * @param  {Array}    arr     Array to generate subsets
 * @param  {Function} fn      Function to call with each subset
 * @param  {*}        context Optional context to call the function in
 * @param  {Number}   n       Optional size to filter subsets
 */
var subsets = function(arr, fn, context, n) {
    var uniques = [];

    uniques_(arr, function(elem) {
        uniques.push(elem);
    });

    var i;
    var j;
    var bit;
    
    var maxSize = uniques.length;
    var twoPowerMaxSize = 1 << maxSize;
    
    var currentSubset = null;

    for (i = 0; i < twoPowerMaxSize; i += 1) {
        currentSubset = [];

        bit = 0;
        for (j = i; j > 0; j = j>>1) {
            if ((j & 1) === 1) {
                currentSubset.push(uniques[bit]);
            }
            bit += 1;
        }

        if ((n == null) || ((n != null) && (currentSubset.length === n))) {
            fn.call(context, currentSubset);
        }

        currentSubset = null;
    }
};

/**
 * Execute a function at every nth element.
 * The callback function receives 3 parameters: the element, the index of
 * the element, and the original array.
 *
 * @param  {Array}    arr        Array to take nth elements from
 * @param  {Number}   n          Value of the step n
 * @param  {Function} fn         Function to call
 * @param  {*}        context    Optional context to call the function in
 */
var takeNth = function(arr, n, fn, context) {
    var length = arr.length;
    var i;

    for (i = n-1; i < length; i += n) {
        fn.call(context, arr[i], i, arr);
    }
};

/**
 * Take the first (or last) n elements of the array
 * only if there are enough elements. If there aren't enough elements
 * an error is thrown.
 *
 * @param  {Array}   arr          Array to take elements from
 * @param  {Number}  n            Number of elements to take
 * @param  {boolean} reversed     If truthy, take from the end of the array instead
 * @return {Array}                Array with the n values
 */
var takeStrict = function(arr, n, reversed) {
    var length = arr.length;

    if (length < n) {
        throw new Error('takeStrict: array does not have enough elements');
    }

    if (reversed) {
        return arr.slice(length-n);
    } else {
        return arr.slice(0, n);
    }
};

/**
 * Execute a function the specified number of times,
 * with an optional increment step that defaults to 1.
 * If the number of times is null or undefined execute the function infinitely.
 * The step will be used regardless of whether the number of times is specified.
 * The callback function receives the current iteration index as its only parameter.
 *
 * @param  {Number}   n        Limit to the number of times
 * @param  {Number}   step     Optional increment (default: 1)
 * @param  {Function} fn       Function to call
 * @param  {*}        context  Optional context to call the function in
 */
var times = function(n, fn, context, step) {
    times_(n, fn, context, step);
};

// Node module exports

module.exports = {
    cycle: cycle,
    distinct: distinct,
    cartesianProduct: cartesianProduct,
    groupBy: groupBy,
    slices: slices,
    subsets: subsets,
    takeNth: takeNth,
    takeStrict: takeStrict,
    times: times
};
