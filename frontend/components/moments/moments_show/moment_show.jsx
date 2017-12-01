import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Feed, Icon, Button, Embed, Divider } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';

class MomentShow extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            display: false, 
            liked: false 
        };
        this.toggleComments = this.toggleComments.bind(this);
        this.likeComment = this.likeComment.bind(this);
    }

    toggleComments(event){
        let flip = !this.state.display;
        this.setState({display:flip});
    }

    likeComment(event){
        this.props.createLike({user_id:this.props.currentUser.id, moment_id: this.props.moment.id});
       
    }

    render(){
        const { users, moment, createComment, currentUser } = this.props; 
        const momentUser = users[moment.user_id]; 

        return (
            <Feed.Event className="feed-event">
                <Feed.Label>

                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User as={Link}to={`/users/${momentUser.id}`}>{momentUser.username}</Feed.User>
                        <Feed.Date></Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra className="feed-content"text>
                        {moment.body}
                        <img src={moment.img_url}/>
                    </Feed.Extra>
                    <Divider />
                    <Feed.Meta>
                        <Feed.Like>
                            <Icon name='like' />
                            {moment.likes.length} likes 
                        </Feed.Like>
                    <Divider />
                    </Feed.Meta>
                    <Feed.Extra>
                        <Button size="mini"onClick={this.likeComment}>Like</Button>
                        <Button size="mini"onClick={this.toggleComments}>Comment</Button>
                        <Button size="mini">Share</Button>

                        <CommentsIndex createComment={this.props.createComment}
                            moment={moment}
                            currentUser={currentUser}
                            comments={moment.comments}
                            users={users}
                            display={this.state.display}/>
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default MomentShow; 