import dispatcher from './../dispatcher.js';
import Request from './../services/Request.js';
import Constants from './../constants/Constants.js';
//import assign from 'object-assign';

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
