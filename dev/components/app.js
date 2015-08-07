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
                    <h2>Data from the store:</h2>
                    <h3>{this.bpLT('DESKTOP') ? 'MOBILE' : 'DESKTOP'}</h3>
                    {this.state.testData}
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
