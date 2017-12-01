import React from 'react';
import { Grid, Image, Item } from 'semantic-ui-react';
import GroupIndexItem from './group_index_item';
import GroupFormContainer from '../group_form/group_form_container';

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

        console.log(this.props.groups);
        console.log(this.props.groups.length);
        if(this.props.groups.length > 20){ 
            this.props.groups.pop(); 
            groups = this.props.groups.map(group => {
                if(group.userIds.includes(this.props.currentUser.id)){
                    if(!group.img_url){
                        group.img_url = 'https://image.flaticon.com/icons/png/512/33/33308.png';
                    }
                    return (
                    <div>
                        <GroupFormContainer/>
                        <Item.Group divided>
                            <Item className="group-index-item-container">
                                <div className="thumbnail">
                                    <Item.Image size="tiny" src={group.img_url} />
                                </div>
                                <div className="group-index-item-1">
                                    <Item.Content verticalAlign="middle">
                                        <GroupIndexItem className="group-index-item-content"group={group} groupId={group.id} />
                                    </Item.Content>
                                </div>
                                <div className="group-index-item-2">
                                    <Item.Content verticalAlign="middle">Content B</Item.Content>
                                </div>
                                <div className="group-index-item-3">
                                    <Item.Content content='Content C' verticalAlign='middle' />
                                </div>
                            </Item>
                       
                        </Item.Group>
                    </div>
                    );
                }
            });
        }else{
            groups = [];
        }
        return(
            <div className="groups-index-container">
                {groups}
            </div>
        );
    }


}

export default GroupIndex; 