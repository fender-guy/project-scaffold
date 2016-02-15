import React from 'react';
import ReactDOM from 'react-dom';
import Store from '../stores/Store';
import actions from '../actions/actions';
import Constants from './../constants/Constants.js';
import Immutable from 'immutable';
import RespState from '../utils/RespState';

class app extends React.Component {

    constructor(props){
        super(props);
        this.rs = new RespState(this._updateCallback.bind(this));
        this.state = {
            rs : this.rs
        };
    }

    _testAction() {
        actions({
            url    : '/testGet',
            type   : Constants.LOAD_TEST_RESPONSE,
            method : (data, store) => {
                let _store = store.getAll();
                store.replace(_store.setIn(['testGetResponse'], Immutable.fromJS(data.testResponse)));
            }
        }).then(() => {
            console.log('post action works');
        });
    }

    _updateCallback() {
        this.forceUpdate();
    }

    componentDidMount() {
        Store.addChangeListener(this._onChange.bind(this));
        //this._onChange(); //comment out later
        this._testAction();
    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <div>
                <h1>Hello App</h1>
                <div>
                    <h2>Current Breakpoint: {this.state.rs.currentBreak}</h2>
                    <h3>{'<='} Desktop: {this.state.rs.bpLTE('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'<'} Desktop: {this.state.rs.bpLT('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'==='} Desktop: {this.state.rs.bpE('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'>'} Tablet: {this.state.rs.bpGT('TABLET') ? 'true' : 'false'}</h3>
                    <h3>{'>='} Tablet: {this.state.rs.bpGTE('TABLET') ? 'true' : 'false'}</h3>
                    <p>{this.state.testData}</p>
                    <p>{this.state.testGetResponse}</p>
                </div>
            </div>
        );
    }

    _onChange() {
        this.setState(Store.getAllJS());
    }
}

app.displayName = 'App';

export default app;
