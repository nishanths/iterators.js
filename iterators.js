var cycle = function(a, n, fn, context) {
    var length = a.length;
    var i = 0;
    var ret = [];

    while (n > 0) {
        n -= 1;
        ret.push(a[i]);

        if (fn != null) {
            fn.call(context, a[i], i, a);
        }

        i = (i + 1) % length;
    }

    return ret;
};

var distinct = function(a, fn, context) {
    var length = a.length;
    var i;
    var seen = new Set();
    var ret = [];

    for (i = 0; i < length; i += 1) {
        if (!(seen.has(a[i]))) {
            seen.add(a[i]);
            ret.push(a[i]);

            if (fn != null) {
                fn.call(context, a[i], i, a);
            }
        }
    }

    return ret;
};

var cartesianProduct = function(a, b, fn, context) {
    var i, j;
    var aLength = a.length;
    var bLength = b.length;
    var ret = [];

    for (i = 0; i < aLength; i += 1) {
        for (j = 0; j < bLength; j += 1) {
            ret.push([a[i], b[i]]);

            if (fn != null) {
                fn.call(context, a[i], b[j], i, j, a);
            }
        }
    }

    return ret;
};

var groupBy = function(a, fn, context) {
    var i;
    var length = a.length;
    var ret = [];
    var current = null;
    var encountered = new Set();

    for (i = 0; i < length; i += 1) {
        if (encountered.has(i)) {
            continue;
        }

        encountered.add(i);
        
        current = [];
        current.push(a[i]);

        Array.prototype.push.apply(
            current, 
            a.filter(function(item, idx) {
                if ((!encountered.has(idx)) && 
                    (fn.call(context, item) === fn.call(context, a[i]))) {
                    current.push(item);
                    encountered.add(idx);
                }
            })
        );

        ret.push(current);
        current = null;
    }

    return ret;
};

var repeat = function(n, fn, context) {
    var i;

    if (n == null) {
        while (true) {
            fn.call(context, i);
        }
    } else {
        for (i = 0; i < n; i += 1) {
            fn.call(context, i);
        }
    }
};

var slices = function(a, n, fn, context) {
    var i;
    var times = Math.ceil(a.length/n);
    var ret = [];
    var slice = null;

    for (i = 0; i < times; i += 1) {
        slice = a.slice(i*n, (i+1)*n);
        ret.push(slice);

        if (fn != null) {
            fn.call(context, slice, i, a);
        }

        slice = null;
    };

    return ret;
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
    var ret = [];

    for (i = n-1; i < length; i += n) {
        ret.push(a[i]);

        if (fn != null) {
            fn.call(context, a[i], i, a);
        }
    }

    return ret;
};

var takeStrict = function(a, n) {
    if (a.length < n) {
        throw new Error('array does not have enough elements');
    }

    return a.slice(0, n+1);
};

module.exports = {
    cycle: cycle,
    distinct: distinct,
    cartesianProduct: cartesianProduct,
    groupBy: groupBy,
    repeat: repeat,
    slices: slices,
    takeNth: takeNth,
    takeStrict: takeStrict
};
