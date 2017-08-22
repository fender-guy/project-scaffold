import './test-style.css';
import CounterComponent from './CounterComponent.js';
import {connect} from 'react-redux';
import * as counterActions from '../../ducks/counter'

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};

const mapDispatchToProps = (dispatch) => {
    return{};
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);