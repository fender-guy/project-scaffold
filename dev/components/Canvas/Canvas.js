import './styles/Canvas.scss';

import React from 'react';

// Canvas just reads the props and dumps all the elements with their attributes into the dom.
class Canvas extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="canvas">Canvas</div>
        );
    }
}

Canvas.propTypes = {

};

Canvas.displayName = 'Canvas';

export default Canvas;