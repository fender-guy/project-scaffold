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
    return element.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
  },

  /**
  * Removes a given class from a given element.
  * @param  {object} el - the html element to remove class from
  * @param  {string} cls - the class to remove from the element
  */
  removeClass(el, cls) {
    const elm = el;
    if (el.classList) {
      elm.classList.remove(cls);
    } else {
      elm.className = el.className.replace(new RegExp(`(^|\\b)${cls.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  },

  /**
  * Adds a given class from a given element.
  * @param  {object} el - the html element to add class to
  * @param  {string} cls - the class to add to the element
  */
  addClass(el, cls) {
    const elm = el;
    if (el.classList) {
      elm.classList.add(cls);
    } else {
      elm.className += ` ${cls}`;
    }
  },

  /**
  * IE detection
  * @returns {*}
  * @private
  */
  detectIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    const edge = ua.indexOf('Edge/');

    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
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
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
  },

  /**
  * returns parsed query string.
  * @param str
  * @returns {object}
  */
  parseParams(str) {
    const pieces = str.split('&');
    const data = {};
    let i;
    let parts;

    // process each query pair
    for (i = 0; i < pieces.length; i += 1) {
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
    const parser = document.createElement('a');
    parser.href = window.location.href;

    return {
      protocol: parser.protocol,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      hash: this.parseParams(parser.hash),
      host: parser.host,
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
    return (...args) => {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
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
    const matchesSelector = elem.matches ||
    elem.webkitMatchesSelector ||
    elem.mozMatchesSelector ||
    elem.msMatchesSelector;
    let el = elem;

    while (el) {
      if (matchesSelector.bind(el)(selector)) {
        return el;
      }

      el = el.parentElement;
    }
    return false;
  },
};

