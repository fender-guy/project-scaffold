/*global fetch:false*/

/** @module REST */

/**
 * REST API
 *
 * This is REST-like, and not real REST.
 *
 * General format: (secure)/[viewmodel]/[action].json
 *  - [method] can be: get, delete, add, update
 *      - GET and DELETE will use the HTTP GET method
 *      - UPDATE and ADD will use the HTTP POST method with a JSON object as the body
 *  - [viewmodel] is usually the data associated with the section that needs to be loaded
 *  - secure is dependent on whether or not the service is secure
 */

/**
 * window.fetch polyfill (https://github.com/github/fetch)
 */
require('whatwg-fetch');

/**
 * https://github.com/hapijs/qs
 */
const qs = require('qs');
const assign = require('object-assign');

/**
 * [Enum for allowable REST methods]
 * @readOnly
 * @enum {string}
 */
const ACTIONS = {
    'GET'    : 'GET',
    'ADD'    : 'ADD',
    'UPDATE' : 'UPDATE',
    'DELETE' : 'DELETE'
};

/**
 * checks if user is allowed to make a request to the provided url in his current authentication state
 * @param  {String} url - The URL that we will be making the REST call to. If it contains '/secure/', authentication needs to be verified
 * @return {Boolean} - True if user is currently allowed to make a request to the provided url. False otherwise.
 */
function isRequestAllowed(url) {
    if (url.match(/(\/secure\/)/gi) === null) {
        return true;
    }
    return true;
}

/**
 * this takes the params passed in through the object and spits out a query sting
 * @param  {Object} options.params - the objcet containing the params
 * @return {String} a query string based on the object that was passed in
 */
function formatParams(options){
    let p = '';
    if (options !== undefined && options.params !== undefined) {
        if (typeof options.params !== 'object') {
            throw 'options.params: URL parameters must be passed as an Object';
        }
        p = '?' + qs.stringify(options.params);
    }
    return p;
}

/**
 * sends authenticated request with specified method to url with data
 * @param  {string} action - must be one of the values in the ACTIONS enum
 * @param  {string} url - url is relative or absolute (for CIAM?)
 * @param  {Object} [options] - optional param
 * @param  {Object} [options.data] - The data object to be POSTed. Assumption: data is already a properly formatted JSON object
 * @param  {string} [options.params] - URL parameters
 *
 * @return {function} returns data requested or an error
 */
function request(action, url, options) {
    let reqObj = {};

    if (ACTIONS[action] === undefined) {
        throw 'Invalid parameter method, should use enum ACTIONS';
    }

    if (url === undefined) {
        throw 'Required param url is missing.';
    }

    if (action === ACTIONS.GET) {
        reqObj = {
            method      : 'get',
            credentials : 'same-origin'
        };
    } else if (action === ACTIONS.ADD || action === ACTIONS.UPDATE || action === ACTIONS.DELETE) {
        if (options === undefined || options.data === undefined) {
            throw 'Missing options.data to pass to POST body.';
        }

        reqObj = {
            method      : 'post',
            credentials : 'same-origin',
            headers     : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body        : JSON.stringify(options.data)
        };
    } else {
        throw 'No action defined, this is not supposed to happen!';
    }

    return fetch(url, reqObj)
        .then( response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response.text());
            } else if (response.status === 403){
                let err = new Error('Invalid authentication');
                let serverErrorEvent = document.createEvent('Event');
                serverErrorEvent.initEvent('AUTH_ERROR', true, true);
                document.dispatchEvent(serverErrorEvent);
                return Promise.reject(err);
            } else if (response.status === 401) {
                return Promise.resolve(response.text());
            } else if (response.status >= 500) { // Don't return the promise; let it hang in limbo forever
                let serverErrorEvent = document.createEvent('Event');
                serverErrorEvent.initEvent('SERVER_ERROR', true, true);
                document.dispatchEvent(serverErrorEvent);
            } else {
                let err = new Error(response.statusText);
                return Promise.reject(err);
            }
        });
}

module.exports = {

    /**
     * get operation for REST API
     * @param {string} url - the URL to GET from
     * @param {Object} [options] - optional parameters: URL params
     * @param {Object} [options.params] - object representation of URL parameters that will be serialized into a query string (see https://github.com/hapijs/qs)
     *
     * @return {Promise} returns a promise
     */
    get(url, options = {}) {
        return request(ACTIONS.GET, url + formatParams(options), options);
    },

    /**
     * update operation for REST API.
     * @param  {string} url - The URL to send POST to
     * @param  {Object} data - the data to POST. Assumes data is correctly formed
     * @param  {Object} options - should contain the data to POST
     * @param  {Object} [options.params] - object representation of URL parameters that will be serialized into a query string (see https://github.com/hapijs/qs)
     *
     * @return {Promise} returns a promise
     */
    update(url, data, options = {}) {
        if (data === undefined || typeof data !== 'object') {
            let err = new Error('data: is not defined or not an Object.');
            return Promise.reject(err);
        } else {
            return request(ACTIONS.UPDATE, url + formatParams(options), assign(options, { data : data}));
        }
    },

    /**
     * delete operation for REST API. Will only delete if authenticated.
     * @param  {string} url     - the URL to execute DELETE
     * @param  {Object} data - the data to POST for deleting
     * @param  {Object} [options] - optional parameters: URL parameters
     * @param  {Object} [options.params] [description]
     *
     * @return {Promise} returns a promise
     */
    delete(url, data, options = {}) {
        return request(ACTIONS.DELETE, url + formatParams(options), assign(options, { data : data}));
    },

    /**
     * add operation for REST API. Will only add if authenticated.
     * @param  {string} url     - the URL to execute ADD
     * @param  {Object} data - the data to POST. Assumes data is correctly formed
     * @param  {Object} [options] - optional parameters: URL parameters
     * @param  {Object} [options.params] [description]
     *
     * @return {Promise} returns a promise
     */
    add(url, data, options = {}) {
        if (data === undefined || typeof data !== 'object') {
            let err = new Error('data: is not defined or not an Object.');
            return Promise.reject(err);
        } else {
            return request(ACTIONS.ADD, url + formatParams(options), assign(options, { data : data}));
        }
    }
};
