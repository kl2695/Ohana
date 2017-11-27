import React from 'react';
import { Image, Icon, Comment, Header, Form, Button } from 'semantic-ui-react';
class CommentsIndex extends React.Component {
    
    constructor(props){
        super(props); 
        if(this.props.moment){
        
            this.state = {
                user_id: this.props.currentUser.id,
                moment_id: this.props.moment.id, 
                body: ''
            };
        }else{
            this.state = {};
        } 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit(event){
        this.props.createComment(this.state);
        this.forceUpdate();
    }

    handleInput(event){
        this.setState({body: event.target.value});
    }

    render(){

    
        let comments = this.props.comments.map(comment => (
            <Comment>
                <Comment.Avatar/>
                <Comment.Content>
                    <Comment.Author as='a'>{this.props.users[comment.user_id].username}</Comment.Author>
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
                    <Form.TextArea onChange={this.handleInput}/>
                    <Button onClick={this.handleSubmit}content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
                </Comment.Group>
        );
    }
}


export default CommentsIndex; 



