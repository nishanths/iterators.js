var distinct = function(a, fn, context) {
    var length = a.length;
    var i;
    var seen = new Set();
    var ret = [];

    for (i = 0; i < length; i += 1) {
        if (!(seen.has(a[i]))) {
            ret.push(fn.call(context, a[i], i, a));
            seen.add(a[i]);
        }
    }

    return ret;
};

var takenth = function(a, n, fn, context) {
    var length = a.length;
    var i;
    var ret = [];

    for (i = 0; i < length; i += n) {
        ret.push(fn.call(context, a[i], i, a));
    }

    return ret;
};

