import React from 'react';
import Store from '../stores/Store';

class app extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Store.addChangeListener(this._onChange.bind(this));
        this._onChange(); //comment out later
    }

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            /* jshint ignore:start */
            <div>
                <h1>Hello App</h1>
                <div>
                    <h2>Data from the store:</h2>
                    {this.state.testData}
                </div>
            </div>
            /* jshint ignore:end */
        );
    }

    _onChange() {
        this.setState(Store.getAll());
    }
}

export default app;
