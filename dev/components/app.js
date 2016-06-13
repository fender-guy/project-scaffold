import './styles/App.scss';

import React from 'react';
import FAD from 'flux-a-duck';
import RespState from '../utils/RespState';
import Grid from './utils/Grid';

import defaultState from './defaultState';

import Canvas from './Canvas/Canvas';
import RightMenu from './Menus/RightMenu';
import LeftMenu from './Menus/LeftMenu';

class app extends React.Component {

    constructor(props){
        super(props);
        this.rs = new RespState(this._updateCallback.bind(this));
        this.state = {
            rs : this.rs
        };
    }

    _updateCallback() {
        this.forceUpdate();
    }

    componentDidMount() {
        FAD.addChangeListener(this._onChange.bind(this));
        defaultState();
    }

    componentWillUnmount() {
        FAD.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        return (
            <div className="app-container">
                <LeftMenu {...this.state} />
                <Canvas {...this.state} />
                <RightMenu {...this.state} />
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
