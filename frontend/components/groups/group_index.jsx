import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

class GroupIndex extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Grid divided='vertically'>
                <Grid.Row>
                    <Grid.Column className="tile"width={3}>
                        
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
                    <Grid.Column width={6}>
                        
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
                    <Grid.Column width={6}>
                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={3}>
                        
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
                    <Grid.Column width={6}>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }


}

export default GroupIndex; 