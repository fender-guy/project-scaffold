import dispatcher from '../dispatcher.js';
import EventEmitter from 'events';
import Constants from '../constants/Constants';
import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let _store = {
    testData : 'Test Data'
};

let store = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _store;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.actionType) {

        //case chartConstants.LOAD_NEW_CANDLE_CHART:
            //break;

        default:
            return true;
    }

    // This often goes in each case that should trigger a UI change. This store
    // needs to trigger a UI change after every view action, so we can make the
    // code less repetitive by putting it here.  We need the default case,
    // however, to make sure this only gets called after one of the cases above.
    store.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = store;
