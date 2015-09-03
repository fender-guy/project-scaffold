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
        console.log('render');
        return (
            <div>
                <h1>Hello App</h1>
                <div>
                    <h2>Data from the store:</h2>
                    <h3>{this.bpE('DESKTOP') ? 'DESKTOP' : 'NOT DESKTOP'}</h3>
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
