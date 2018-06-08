import React from 'react';
import { Link } from 'react-router-dom'; 

const GroupIndexItem = (props) => {


    return (
        <div>
            <Link to={`/groups/${props.groupId}`}>{props.group.name}</Link>
        </div>
    );
};


export default GroupIndexItem; 