export default {
    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    },

    params(obj) {
        return Object.keys(obj).map(function (key) {
            return key + '=' + obj[key];
        }).join('&');
    },

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
    }
};


