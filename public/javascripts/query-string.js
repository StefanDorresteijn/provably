(function() {
    'use strict';
    var queryString = {};
    queryString.parse = function(str) {
        if (typeof str !== 'string') {
            return {};
        }
        str = str.trim().replace(/^(\?|#)/, '');
        if (!str) {
            return {};
        }
        return str.trim().split('&').reduce(function(ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key);
            val = val === undefined ? null : decodeURIComponent(val);
            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }
            return ret;
        }, {});
    };
    queryString.stringify = function(obj) {
        return obj ? Object.keys(obj).map(function(key) {
                var val = obj[key];
                if (Array.isArray(val)) {
                    return val.map(function(val2) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                    }).join('&');
                }
                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            }).join('&') : '';
    };
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return queryString;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = queryString;
    } else {
        window.queryString = queryString;
    }
})();