import dispatcher from './../dispatcher.js';
import Request from './../services/Request.js';
import Constants from './../constants/Constants.js';
import store from '../stores/Store.js';
import Immutable from 'immutable';

//abstract these two into one file somehow

store.methods[Constants.LOAD_TEST_RESPONSE] = function(data) {
    let _store = store.getAll();
    console.log(_store, data);
    store.replace(_store.setIn(['testGetResponse'], Immutable.fromJS(data.testResponse)));
    //_store.testGetResponse = data.testResponse;
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
