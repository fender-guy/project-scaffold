import React from 'react';
import FAD from 'flux-a-duck';
import Immutable from 'immutable';
import styles from './../globalStyles/test.css';
// import RespState from '../utils/RespState';
// import Grid from './utils/Grid';

class app extends React.Component {

  /**
  constructor(props) {
    super(props);
     this.rs = new respstate(this._updatecallback.bind(this));
     this.state = {
       rs : this.rs
     };
  }
  **/

  static testAction() {
    FAD.action({
      url: '/testGet',
    },
    (store, data) => {
      const newStore = store.getAll();
      store.replace(newStore.setIn(['testGetResponse'], Immutable.fromJS(data.testResponse)));
    });
  }

  componentDidMount() {
    FAD.addChangeListener(this.onChange.bind(this));
    // app.testAction();
  }

  componentWillUnmount() {
    FAD.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    this.setState(FAD.getAllJS());
  }

  updateCallback() {
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h1 className={styles.title} style={{ margin: '50px 0 0 0' }}>Hello Apps</h1>
        <div>
          {/** }
          <h2>Current Breakpoint: {this.state.rs.currentBreak}</h2>
          <h3>{'<='} Desktop: {this.state.rs.bpLTE('DESKTOP') ? 'true' : 'false'}</h3>
          <h3>{'<'} Desktop: {this.state.rs.bpLT('DESKTOP') ? 'true' : 'false'}</h3>
          <h3>{'==='} Desktop: {this.state.rs.bpE('DESKTOP') ? 'true' : 'false'}</h3>
          <h3>{'>'} Tablet: {this.state.rs.bpGT('TABLET') ? 'true' : 'false'}</h3>
          <h3>{'>='} Tablet: {this.state.rs.bpGTE('TABLET') ? 'true' : 'false'}</h3>
          <p>{this.state.testData}</p>
          <p>{this.state.testGetResponse}</p>
          {**/}
        </div>
        {/** }<Grid {...this.state}/>{**/}
      </div>
    );
  }
}

app.displayName = 'App';

export default app;
