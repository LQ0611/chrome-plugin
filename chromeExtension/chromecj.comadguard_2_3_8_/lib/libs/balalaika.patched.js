/**
 * Balalaika library
 *
 * https://github.com/finom/balalaika/blob/master/balalaika.js
 */
var balalaika = (function (window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $) {
    $ = function (s, context) {
        return new $.i(s, context);
    };

    $.i = function (s, context) {
        fn.push.apply(this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test(s)
            ? ( ( i = document.createElement(context || 'q') ).innerHTML = s, i.children ) : (context && $(context)[0] || document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s);
    };

    $.i[l = 'prototype'] = ( $.extend = function (obj) {
        k = arguments;
        for (i = 1; i < k.length; i++) {
            if (l = k[i]) {
                for (j in l) {
                    obj[j] = l[j];
                }
            }
        }

        return obj;
    })($.fn = $[l] = fn, { // $.fn = $.prototype = fn
        on: function (n, f) {
            // n = [ eventName, nameSpace ]
            n = n.split(nsRegAndEvents);
            this.map(function (item) {
                // item.b$ is balalaika_id for an element
                // i is eventName + id ("click75")
                // nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
                ( nsRegAndEvents[i = n[0] + ( item.b$ = item.b$ || ++id )] = nsRegAndEvents[i] || [] ).push([f, n[1]]);
                // item.addEventListener( eventName, f )
                item['add' + s_EventListener](n[0], f);
            });
            return this;
        },
        off: function (n, f) {
            // n = [ eventName, nameSpace ]
            n = n.split(nsRegAndEvents);
            // l = 'removeEventListener'
            l = 'remove' + s_EventListener;
            this.map(function (item) {
                // k - array of events
                // item.b$ - balalaika_id for an element
                // n[ 0 ] + item.b$ - eventName + id ("click75")
                k = nsRegAndEvents[n[0] + item.b$];
                // if array of events exist then i = length of array of events
                if (i = k && k.length) {
                    // while j = one of array of events
                    while (j = k[--i]) {
                        // if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
                        if (( !f || f == j[0] ) && ( !n[1] || n[1] == j[1] )) {
                            // item.removeEventListener( eventName, handler );
                            item[l](n[0], j[0]);
                            // remove event from array of events
                            k.splice(i, 1);
                        }
                    }
                } else {
                    // if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
                    !n[1] && item[l](n[0], f);
                }
            });
            return this;
        },
        is: function (s) {
            i = this[0];
            return (i.matches
            || i['webkit' + s_MatchesSelector]
            || i['moz' + s_MatchesSelector]
            || i['ms' + s_MatchesSelector]
            || i['o' + s_MatchesSelector]).call(i, s);
        }
    });
    return $;
})(window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector');

/**
 * Add some more functions to balalaika
 */
balalaika.fn.hasClass = function (className) {
    return !!this[0] && (this[0].classList != undefined) && this[0].classList.contains(className);
};

balalaika.fn.addClass = function (className) {
    this.forEach(function (item) {
        var classList = item.classList;
        classList.add.apply(classList, className.split(/\s/));
    });
    return this;
};

balalaika.fn.removeClass = function (className) {
    this.forEach(function (item) {
        var classList = item.classList;
        classList.remove.apply(classList, className.split(/\s/));
    });
    return this;
};

balalaika.fn.get = function (index) {
    return this.length > index ? this[index] : null;
};

balalaika.fn.css = function (attr, value) {
    this.forEach(function (item) {
        item.style[attr] = value;
    });
    return this;
};

balalaika.fn.hide = function () {
    this.forEach(function (item) {
        item.style['display'] = 'none';
    });
    return this;
};

balalaika.fn.show = function () {
    this.forEach(function (item) {
        item.style['display'] = 'block';
    });
    return this;
};

balalaika.fn.remove = function () {
    this.forEach(function (item) {
        item.parentNode.removeChild(item);
    });
    return this;
};

balalaika.fn.text = function (v) {
    this.forEach(function (item) {
        item.textContent = v;
    });
    return this;
};

balalaika.fn.attr = function (k, v) {
    this.forEach(function (item) {
        item.setAttribute(k, v);
    });
    return this;
};

balalaika.fn.trigger = function (eventName, options) {
    this.forEach(function (item) {
        if (window.CustomEvent) {
            var event = new CustomEvent(eventName, {detail: options});
        } else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, options);
        }

        item.dispatchEvent(event);
    });
    return this;
};