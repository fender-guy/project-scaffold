import './test-style.css';
import CounterComponent from './CounterComponent.js';
import {connect} from 'react-redux';
import {decrementCounter, incrementCounter, clearCounter} from '../../ducks/counter'

const mapStateToProps = (state) => {
    return {
        counter: state.get('counter')
    };
};

export default connect(mapStateToProps, {decrementCounter, incrementCounter, clearCounter})(CounterComponent);