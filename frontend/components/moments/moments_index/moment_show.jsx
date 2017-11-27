import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Feed, Icon, Button, Embed } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';

const MomentShow = (props) => {

    const { user, users, moment, createComment, currentUser } = props; 
    console.log(props);

    return (
        <Feed.Event>
            <Feed.Label>

            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{users[moment.user_id].username}</Feed.User> added you as a friend
                    <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {moment.body}
                    <img src={moment.img_url} alt="Image uploaded with Filestack" title="Image uploaded with Filestack" />
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

                    <CommentsIndex createComment={props.createComment}
                        moment={moment}
                        currentUser={currentUser}
                        comments={moment.comments}
                        users={users} />
                </Feed.Extra>
            </Feed.Content>
        </Feed.Event>
    );
};

export default MomentShow; 