import './styles/LeftMenu.scss';

import React from 'react';
import ToolsMenu from './ToolsMenu/ToolsMenu';
import ElementsMenu from './ElementsMenu/ElementsMenu';

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderMenus() {
        if(this.props.leftMenu) {
            return this.props.leftMenu.map((menu, i) => {
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
            <div className="left-Menu">{this._renderMenus()}</div>
        );
    }
}

LeftMenu.propTypes = {
    leftMenu : React.PropTypes.array
};

LeftMenu.displayName = 'LeftMenu';

export default LeftMenu;