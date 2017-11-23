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


        if(this.state.groups.length > 4){ 
            groups = this.state.groups.map(group => (
                <Grid.Row>
                    <Grid.Column className="tile"width={3}>
                        <GroupIndexItem group={group} groupId={group.id} /> 
                    </Grid.Column>
    
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
    
                    <Grid.Column width={6}>
                        
                    </Grid.Column>
                </Grid.Row>
            ));
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