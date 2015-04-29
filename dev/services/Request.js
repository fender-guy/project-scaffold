import utils from '../utils';


export default class request {

    constructor(url, params, callback) {
        this.callback = callback;
        this.request = new XMLHttpRequest();

        this.url = url + '?' + utils.params(params);

        this.request.open('GET', this.url, true);

        this.request.onload = function () {
            if (this.request.status >= 200 && this.request.status < 400) {
                // Success!
                if (callback) {
                    this.callback(this.request.responseText);
                }
            } else {
                console.error('We reached our target server, but it returned an error: ', this.request);
            }
        }.bind(this);

        this.request.onerror = function () {
            // There was a connection error of some sort
            console.error('there was a connection error of some sort');
        };

    }

    sendRequest() {
        this.request.send();
    }
}

