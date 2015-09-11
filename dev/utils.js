export default {

    /**
     * Capitalizes the first letter of a string based on this perf:
     * http://jsperf.com/capitalize-javascript-string
     * @param str
     * @returns {string}
     */
    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    },

    /**
     * Checks if a given element has a class
     * @param  {object} element - the html element to check
     * @param  {string} class - the class to check for
     * @return {Boolean} - True if user the element has the class.
     */
    hasClass(element, cls) {
        return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    /**
     * Removes a given class from a given element.
     * @param  {object} el - the html element to remove class from
     * @param  {string} cls - the class to remove from the element
     */
    removeClass(el, cls) {
        if (el.classList) {
            el.classList.remove(cls);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },

    /**
     * Adds a given class from a given element.
     * @param  {object} el - the html element to add class to
     * @param  {string} cls - the class to add to the element
     */
    addClass(el, cls) {
        if (el.classList) {
            el.classList.add(cls);
        } else {
            el.className += ' ' + cls;
        }
    },

    /**
     * IE detection
     * @returns {*}
     * @private
     */
    detectIE() {
        let ua = window.navigator.userAgent,
            msie = ua.indexOf('MSIE '),
            trident = ua.indexOf('Trident/'),
            edge = ua.indexOf('Edge/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        if (edge > 0) {
            // IE 12 => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    params(obj) {
        return Object.keys(obj).map(function (key) {
            return key + '=' + obj[key];
        }).join('&');
    },

    /**
     * returns parsed query string.
     * @param str
     * @returns {object}
     */
    parseParams(str) {
        let pieces = str.split('&'), data = {}, i, parts;
        // process each query pair
        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split('=');
            if (parts.length < 2) {
                parts.push('');
            }
            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);

        }
        return data;
    },

    /**
     * returns an object with all the URL goodies you need
     * based on this: https://gist.github.com/jlong/2428561
     * @param url
     * @returns {HTMLElement}
     */
    parseUrl() {
        var parser = document.createElement('a');
        parser.href = window.location.href;

        return {
            protocol : parser.protocol,
            hostname : parser.hostname,
            port     : parser.port,
            pathname : parser.pathname,
            search   : parser.search,
            hash     : this.parseParams(parser.hash),
            host     : parser.host
        };
    },

    /**
    * Returns a function, that, as long as it continues to be invoked, will not
    * be triggered. The function will be called after it stops being called for
    * N milliseconds. If `immediate` is passed, trigger the function on the
    * leading edge, instead of the trailing.
    * @param  {Function} func - the function you want to debounce
    * @param  {Number} wait - the time to wait
    * @param  {Boolean} immediate - trigger the function on the leading edge
    * @return {Function} the new debounces function
    */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            let context = this,
                args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    },

    /**
     * used just like jquery's parents() method
     * from here: http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
     * @param element
     * @param selector
     * @returns {HTML element}
     */
    closest(elem, selector) {
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem) {
            if (matchesSelector.bind(elem)(selector)) {
                return elem;
            } else {
                elem = elem.parentElement;
            }
        }
        return false;
    }
};


