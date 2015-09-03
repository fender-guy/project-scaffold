import dispatcher from './../dispatcher.js';
import Request from './../services/Request.js';
import Constants from './../constants/Constants.js';
import store from '../stores/Store.js';

store.methods[Constants.LOAD_TEST_RESPONSE] = function(data) {
    let _store = store.getStoreObj();
    _store.testGetResponse = data.testResponse;
};

export default {

    baseURL : '/testGet',

    testAction() {
        Request.get(this.baseURL, {}).then((data) => {
            dispatcher.handleViewAction({
                actionType : Constants.LOAD_TEST_RESPONSE,
                data       : JSON.parse(data)
            });
        });
    }
};
