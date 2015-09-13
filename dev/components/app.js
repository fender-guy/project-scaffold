import Store from '../stores/Store';
import actions from '../actions/actions';
import Constants from './../constants/Constants.js';
import Immutable from 'immutable';

class app extends appHOC {

    constructor(props){
        super(props);
        this.state = {};
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

    componentDidMount() {
        Store.addChangeListener(this._onChange.bind(this));
        this._onChange(); //comment out later
        this._testAction();
        //actions.testAction();
    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <div>
                <h1>Hello App</h1>
                <div>
                    <h2>Current Breakpoint: {this.currentBreak}</h2>
                    <h3>{'<='} Desktop: {this.bpLTE('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'<'} Desktop: {this.bpLT('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'==='} Desktop: {this.bpE('DESKTOP') ? 'true' : 'false'}</h3>
                    <h3>{'>'} Tablet: {this.bpGT('TABLET') ? 'true' : 'false'}</h3>
                    <h3>{'>='} Tablet: {this.bpGTE('TABLET') ? 'true' : 'false'}</h3>
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
