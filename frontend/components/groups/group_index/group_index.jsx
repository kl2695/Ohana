import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import GroupIndexItem from './group_index_item';

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


        if(this.props.groups.length > 4){ 
            this.props.groups.pop(); 
            groups = this.props.groups.map(group => {
                console.log(group);
                if(group.userIds.includes(this.props.currentUser.id)){
                    return (
                    <Grid.Row>
                        <Grid.Column className="tile"width={3}>
                            <GroupIndexItem group={group} groupId={group.id} /> 
                        </Grid.Column>
        
                        <Grid.Column width={7}>
                            
                        </Grid.Column>
        
                        <Grid.Column width={6}>
                            
                        </Grid.Column>
                    </Grid.Row>
                    );
                }
            });
        }else{
            groups = [];
        }
        return(
            <Grid divided='vertically'>
                {groups}
            </Grid>
        );
    }


}

export default GroupIndex; 