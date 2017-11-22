import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import GroupIndexItem from './group_index_item';

class GroupIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        (this.props.requestAllGroups()); 
    }

    componentWillReceiveProps(newProps){
        this.setState({groups: newProps.groups});
    }
    
    render(){
        let groups;
        if(this.props.groups){

            groups = this.props.groups.map(group => (
                <Grid.Row>
                    <Grid.Column className="tile"width={3}>
                        <GroupIndexItem group={group} /> 
                    </Grid.Column>
    
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
    
                    <Grid.Column width={6}>
                        
                    </Grid.Column>
                </Grid.Row>
            ));
        }else{
            groups = {};
        }
        return(
            <Grid divided='vertically'>
                {groups}
            </Grid>
        );
    }


}

export default GroupIndex; 