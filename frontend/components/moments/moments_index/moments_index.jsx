import React from 'react';
import { Grid, Image, Feed, Icon, Button} from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';
class MomentIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {}; 
    }

    componentDidMount(){
        this.props.requestAllUsers(); 
    }

     componentWillMount(){
        this.props.requestAllMoments(); 
    }

    render(){

        let moments; 
        if(this.props.moments){
            console.log(this.props);
            moments = this.props.moments.map(moment => (
                <Feed.Event>
                <Feed.Label>
                    
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                    <Feed.User>{this.props.users[moment.user_id].username}</Feed.User> added you as a friend
                    <Feed.Date>1 Hour Ago</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {moment.body}
                        <img src={moment.img_url} alt="Image uploaded with Filestack" title="Image uploaded with Filestack"/>
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like>
                        <Icon name='like' />
                        4 Likes
                    </Feed.Like>
                    </Feed.Meta>
                    <Feed.Extra>
                        <Button>Like</Button>
                        <Button>Comments</Button>
                        <Button>Share</Button>
                        
                        <CommentsIndex comments={moment.comments} users={this.props.users} />
                    </Feed.Extra>
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