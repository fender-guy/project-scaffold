import dispatcher from '../dispatcher.js';
import EventEmitter from 'events';
import assign from 'object-assign';
import Immutable from 'immutable';

let CHANGE_EVENT = 'change';

let _store = Immutable.fromJS({
    testData : 'Test Data'
});

let store = assign({}, EventEmitter.prototype, {
    methods : {},

    getAll() {
        return _store;
    },

    getAllJS() {
        return _store.toJS();
    },

    replace(newStore) {
        _store = newStore;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function (payload) {
    let action = payload.action;

    if(store.methods[action.actionType]) {
        store.methods[action.actionType](action.data);
    } else {
        throw 'there is no ' + action.actionType + ' method in the store';
    }

    // This often goes in each case that should trigger a UI change. This store
    // needs to trigger a UI change after every view action, so we can make the
    // code less repetitive by putting it here.  We need the default case,
    // however, to make sure this only gets called after one of the cases above.
    store.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = store;
