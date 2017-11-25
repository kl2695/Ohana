import React from 'react';
import { Image, Icon, Comment, Header, Form, Button } from 'semantic-ui-react';
const CommentsIndex = (props) => {
    
console.log(props);


    let comments = props.comments.map(comment => (
        <Comment>
            <Comment.Avatar/>
            <Comment.Content>
                <Comment.Author as='a'>{props.users[comment.user_id].username}</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    ));
    return (
        <Comment.Group minimal>
            <Header as='h3' dividing>Comments</Header>
            {comments}
            <Form reply>
                <Form.TextArea />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
            </Comment.Group>
    );


};

export default CommentsIndex; 



