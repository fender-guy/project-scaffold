import RespState from './HOCs/RespState';
import mixin from 'mixin';

/**
 * This is where you put the methods you want to share throughout the entire app.
 * AKA high order component.
 */

/*eslint-disable */
@RespState
/*eslint-enable */
export default class appHOC extends React.Component{
    constructor(props) {
        super(props);
    }
}

appHOC.displayName = 'appHOC';

