import dispatcher from './../dispatcher.js';
import Request from './../services/Request.js';
import store from '../stores/Store.js';

function getErrorStack(error) {
    if (error && error.stack) {
        console.error(error.stack);
    } else {
        console.error(error);
    }
}

export default (settings) => {

    store.methods[settings.type] = (data) => {
        settings.method(data, store);
    };

    return Request.get(settings.url, {}).then((data) => {
        dispatcher.handleViewAction({
            actionType : settings.type,
            data       : JSON.parse(data)
        });
        return Promise.resolve();
    }).catch((errorData) => {
        getErrorStack(errorData);
        return Promise.reject(errorData);
    });

};
