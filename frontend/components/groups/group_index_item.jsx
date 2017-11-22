import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react';

const GroupIndexItem = (props) => {


    return (
        <div>
            <Link to='/groups/{props.group.name}
        </div>
    );
};


export default GroupIndexItem; 