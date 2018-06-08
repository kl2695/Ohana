import React from 'react';
import { Menu, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function GroupShowHeader (props) {
    let header = (
        <div className="groupshow-title">
            <h1>{props.currentGroup.name}</h1>
        </div>
    );
    
    let menu = (
        <Menu tabular borderless className='groupshow-nav-bar'>
            <Menu.Item>
                <Link to={`/groups/${props.currentGroup.id}`}>Moments</Link>
            </Menu.Item>

            <Menu.Item>
                <Link to={`/groups/${props.currentGroup.id}/messages`}>Messages</Link>
            </Menu.Item>
        </Menu>
    ); 

    return(
        <div className="groupshow-header">
            {header}
            {menu}
        </div>
    );
}

export default GroupShowHeader; 