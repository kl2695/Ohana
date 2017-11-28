import React from 'react';
import { Link } from 'react-router-dom';
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
        this.props.createComment(this.state)
        .then(()=> this.clearBody()); 

    }

    handleInput(event){
        this.setState({body: event.target.value});
    }

    clearBody(){
        this.setState({body: ''}); 
        console.log('im here'); 
        console.log(this.state.body);
    }

    redirectToUser(event){
        this.props.history.push()
    }

    render(){
        let replyFormClass; 
        if(this.props.display === true){
            replyFormClass = '';
        }else{
            replyFormClass = "hidden";
        }


        let comments = this.props.comments.map(comment => {
            let commentUser = this.props.users[comment.user_id]; 
            return(

            
                <Comment>
                    <Comment.Avatar/>
                    <Comment.Content>
                        <Comment.Author as={Link}to={`/users/${commentUser.id}`}>{commentUser.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
                );
        });

        return (
            <Comment.Group minimal>
                <Header as='h3' dividing></Header>
                {comments}
                <Form className={replyFormClass}reply>
                    <Form.TextArea onChange={this.handleInput} value={this.state.body}/>
                    <Button onClick={this.handleSubmit}content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
                </Comment.Group>
        );
    }
}


export default CommentsIndex; 



