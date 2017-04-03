import './styles/grid.scss';
import React from 'react';
import utils from '../../utils';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showGrid : false
        };
        document.addEventListener('keypress', this.keyPress.bind(this), false);
    }

    keyPress(e){
        if (e.target.tagName === 'BODY' && e.keyCode === 103){
            if (this.state.showGrid) {
                this.setState({ showGrid : false});
            } else {
                this.setState({ showGrid : true});
            }
        }
    }

    render() {
        let rs = this.props.rs;
        if(this.state.showGrid) {
            if(rs.bpE('DESKTOP')) {
                return(
                    <div className="grid-container desktop" >
                        <div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                            <div className="grid" ></div>
                        </div>
                    </div>
                );
            } else if(rs.bpE('TABLET')) {
                return(
                    <div className="grid-container tablet" >
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                    </div>
                );
            } else if(rs.bpE('MOBILE')) {
                return(
                    <div className="grid-container mobile" >
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                        <div className="grid" ></div>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

Grid.propTypes = {
    rs : React.PropTypes.object
};

Grid.displayName = 'Grid';

export default Grid;