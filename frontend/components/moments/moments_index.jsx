import React from 'react';
import { Grid, Image, Feed, Icon } from 'semantic-ui-react';
class MomentIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {}; 
    }

     componentWillMount(){
        this.props.requestAllMoments(); 
    }

    render(){

        let moments; 
        if(this.props.moments){
            moments = this.props.moments.map(moment => (
                <Feed.Event>
                <Feed.Label>
                    
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                    <Feed.User>RandomUser</Feed.User> added you as a friend
                    <Feed.Date>1 Hour Ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {moment.body}
                    </Feed.Extra>
                    <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />
                        4 Likes
                    </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
                </Feed.Event>
            ));
    }else{
        moments = [];

    }
            
        return(
            <div>
                <Feed>
                    {moments}    
                </Feed>
            </div>
        );
    }


}

export default MomentIndex; 