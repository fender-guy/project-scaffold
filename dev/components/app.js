import React from 'react';
import ReactDOM from 'react-dom';
import FAD from 'flux-a-duck';
import Immutable from 'immutable';
import RespState from '../utils/RespState';
import Grid from './utils/Grid';

class app extends React.Component {

    constructor(props){
        super(props);
        this.rs = new RespState(this._updateCallback.bind(this));
        this.state = {
            rs : this.rs
        };
    }

    _testAction() {
        FAD.action({
            url : '/testGet'
        },
        (store, data) => {
            let _store = store.getAll();
            store.replace(_store.setIn(['testGetResponse'], Immutable.fromJS(data.testResponse)));
        }).then(() => {
            console.log('post action works');
        });
    }

    _updateCallback() {
        this.forceUpdate();
    }

    componentDidMount() {
        FAD.addChangeListener(this._onChange.bind(this));
        this._testAction();
    }

    componentWillUnmount() {
        FAD.removeChangeListener(this._onChange.bind(this));
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
                <Grid {...this.state}/>
            </div>
        );
    }

    _onChange() {
        this.setState(FAD.getAllJS());
    }
}

app.displayName = 'App';

export default app;
