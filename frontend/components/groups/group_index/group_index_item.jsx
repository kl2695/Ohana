import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react';

const GroupIndexItem = (props) => {


    return (
        <div>
            <Link to={`/groups/${props.groupId}`}>{props.group.name}</Link>
        </div>
    );
};


export default GroupIndexItem; 