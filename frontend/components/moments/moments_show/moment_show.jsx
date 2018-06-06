import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Feed, Icon, Button, Embed, Divider, Comment } from 'semantic-ui-react';
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
        this.props.createLike({ user_id: this.props.currentUser.id, moment_id: this.props.moment.id });
    }

    render(){
        const { users, moment, createComment, currentUser } = this.props; 
        const momentUser = users[moment.user_id]; 
        return (
            <Feed.Event className="feed-event">
                <Feed.Label>
                    <Image avatar src={momentUser.img_url} size="mini" circular rounded/>
                    <Feed.User as={Link} to={`/users/${momentUser.id}`}>{momentUser.username}</Feed.User>
                </Feed.Label>
                <Feed.Content className="feed-content">
                    <Feed.Summary>
                        <Feed.Date></Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra className="feed-content"text>
                        {moment.body}
                        <img className="moment-pictures"src={moment.img_url}/>
                    </Feed.Extra>                
                </Feed.Content>
                <Feed.Meta className="feed-meta">
                    <div className="feed-meta-item" onClick={this.likeComment}> <Icon name="like" color="blue"/>Like</div>
                    <div className="feed-meta-item" size="mini" onClick={this.toggleComments}>
                        <Icon name="comments"color="blue"/>
                        Comment
                        </div>
                    <div className="feed-meta-item" size="mini"><Icon name="share" color="blue"/>Share</div>
                </Feed.Meta>
                <Feed.Extra className="feed-extra">
                    <Feed.Like className="feed-like">
                        <Icon name='like' />
                        {moment.likes.length} likes
                    </Feed.Like>
                    <CommentsIndex createComment={this.props.createComment}
                        moment={moment}
                        currentUser={currentUser}
                        comments={moment.comments}
                        users={users}
                        display={this.state.display}/>
                </Feed.Extra>
                
            </Feed.Event>
        );
    }
}

export default MomentShow; 