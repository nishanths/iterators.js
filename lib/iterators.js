var cycle = function(a, n, fn, context) {
    var length = a.length;
    var i = 0;
    
    while (n > 0) {
        n -= 1;
        fn.call(context, a[i], i, a);
        i = (i + 1) % length;
    }
};

var distinct = function(a, fn, context) {
    var length = a.length;
    var i;
    var seen = new Set();

    for (i = 0; i < length; i += 1) {
        if (!(seen.has(a[i]))) {
            seen.add(a[i]);
            fn.call(context, a[i], i, a);
        }
    }
};

var product = function(a, b, fn, context) {
    var i, j;
    var aLength = a.length;
    var bLength = b.length;

    for (i = 0; i < aLength; i += 1) {
        for (j = 0; j < bLength; j += 1) {
            fn.call(context, a[i], b[j], i, j, a);
        }
    }
};

var repeat = function(n, fn, context) {
    var i;
    
    for (i = 0; i < n; i += 1) {
        fn.call(context, i);
    }
};

var slices = function(a, n, fn, context) {
    var i;
    var times = Math.ceil(a.length/n);

    for (i = 0; i < times; i += 1) {
        fn.call(context, a.slice(i*n, (i+1)*n), i, a);
    };
};

var subsets = function(a, size, fn, context) {
    if (a == null) {
        return [];
    }

    var ret = [];
    var i, j, k;
    var length = a.length;

    ret.push([]);
};

var takeNth = function(a, n, fn, context) {
    var length = a.length;
    var i;

    for (i = n-1; i < length; i += n) {
        fn.call(context, a[i], i, a);
    }
};

module.exports = {
    cycle: cycle,
    distinct: distinct,
    product: product,
    repeat: repeat,
    slices: slices,
    takeNth: takeNth
};
