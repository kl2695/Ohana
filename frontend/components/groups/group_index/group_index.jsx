import React from 'react';
import { Grid, Image, Item } from 'semantic-ui-react';
import GroupIndexItem from './group_index_item';
import GroupFormContainer from '../group_form/group_form_container';
import GroupShowContainer from '../group_show/group_show_container';

class GroupIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {groups: []
        };
    }

    componentWillMount(){
        this.props.requestAllGroups(); 
    }

    componentWillReceiveProps(newProps){
        this.setState({groups: newProps.groups});
    }
    
    render(){
        let groups;
        let groupShow; 
        if(this.props.groups.length > 20){ 
            this.props.groups.pop(); 

            groups = this.props.groups; 
            groupShow = (
                <GroupShowContainer groups={groups} />
            );
         
        }else{
            groups = [];
        }
        return(
            <div className="groups-index-container">
                {groupShow}
            </div>
        );
    }


}

export default GroupIndex; 