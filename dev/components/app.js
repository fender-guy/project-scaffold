import Store from '../stores/Store';
import actions from '../actions/actions';

class app extends appHOC {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Store.addChangeListener(this._onChange.bind(this));
        this._onChange(); //comment out later
        actions.testAction();
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
        this.setState(Store.getAll());
    }
}

app.displayName = 'App';

export default app;
