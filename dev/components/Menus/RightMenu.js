import './styles/RightMenu.scss';

import React from 'react';
import ToolsMenu from './ToolsMenu/ToolsMenu';
import ElementsMenu from './ElementsMenu/ElementsMenu';

class RightMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderMenus() {
        if(this.props.rightMenu) {
            return this.props.rightMenu.map((menu, i) => {
                switch(menu.type) {
                    case 'tools' :
                        return <ToolsMenu key={i} {...this.state} />;
                        break;
                    case 'elements' :
                        return <ElementsMenu key={i} {...this.state} />;
                        break;
                }
            });
        }
    }

    render() {
        return(
            <div className="right-Menu">{this._renderMenus()}</div>
        );
    }
}

RightMenu.propTypes = {
    rightMenu : React.PropTypes.array
};

RightMenu.displayName = 'RightMenu';

export default RightMenu;