import RespState from './HOCs/RespState';
import mixin from 'mixin';

/**
 * This is where you put the methods you want to share throughout the entire app.
 * AKA high order component.
 */
class appHOC extends mixin(RespState, React.Component) {
    constructor(props) {
        super(props);
    }
}

export default appHOC;

