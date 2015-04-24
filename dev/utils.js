export default {
    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    },

    params(obj){
        return Object.keys(obj).map(function(key) {
            return key + '=' + obj[key];
        }).join('&');
    },
};

