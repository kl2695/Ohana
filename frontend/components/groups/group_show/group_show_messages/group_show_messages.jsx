import React from 'react';
import { List, Image, Header, Link, Feed, Icon, Menu, Container, Form, Button, TextArea, Input } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../../moments/moments_show/moment_show';
import SideBar from './group_show_messages_sidebar';
import ChatView from 'react-chatview';
import Promise from 'promise';



class GroupShowMessages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            messages:[],
            message:{
                body: '', 
                group_id: null
            }, 
            position: 30,
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.loadMoreHistory = this.loadMoreHistory.bind(this);

    }

    componentDidMount() {

        const App = window.App; 
        let fn = this; 
        App.messages = App.cable.subscriptions.create('MessagesChannel', {

            received: function (data) {
                const message = this.renderMessage(data); 
                const messages = fn.state.messages; 
                messages.push(message);
                return fn.setState({messages: messages});
            },

            renderMessage: function (data) {
                return data.user + ": " + data.message;
            }
        });

        this.props.requestGroup(this.props.groupId);

    }

    componentWillReceiveProps(newProps) {
        const messagesArr = this.props.messagesArr.map(message => (
            this.props.users[message.user_id].username + ": " + message.body 
        ));

        this.setState({messages:messagesArr,
            message:{body:this.state.message.body,group_id: newProps.groupId},
        });
    }


    
    componentWillUnmount() {
        const App = window.App; 
        App.messages.unsubscribe(); 
    }


    handleSubmit(event) {
        this.props.createMessage(this.state.message);
        this.setState({message:{body: '', group_id:this.state.message.group_id}});

        
    }

    handleInput(event){
        event.preventDefault(); 
        this.setState({message:{body: event.target.value, group_id: this.state.message.group_id}});
    }

    loadMoreHistory() {
        return new Promise((resolve, reject) => {
            this.props.updateGroup({
                id: this.props.groupId,
                name: this.props.groups.name,
                img_url: this.props.groups.img_url,
                position:this.state.position + 30
            });
            this.setState({position: this.state.position + 30});
            resolve();
        });
    }
   
    

    


    render() {

        let names; 
        let result =[]; 
        if(this.props.users){
            names = Object.keys(this.props.users).map(userId => {
                let user = this.props.users[userId];
                if(!user.img_url){
                    user.img_url ='https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png';
                }
                return(

                    <List.Item>
                        <Image avatar src={user.img_url} />
                        <List.Content>
                            <List.Header as={Link}to={`/users/${userId}`}>{user.username}</List.Header>
                        </List.Content>
                    </List.Item>
                   
                
                );
            });

            for (let i = 0; i < names.length; i++) {
                if (i > 5) {
                    break;
                } else {
                    result.push(names[i]);
                }
            }
       
            
        }

        const messages = this.state.messages.map(message => (
            <div>{message}</div>
        )).reverse();
        return (
            <div className="groupshow-messages-container">
                <div className="messages-container-left">
                    <Container fluid id="messages-container" textAlign="left">
                        Messages
                            <ChatView scrollLoadThreshold={50}
                            onInfiniteLoad={this.loadMoreHistory} flipped={true}> 
                                {messages}
                            </ChatView>
                    </Container>

                    <Form onSubmit={this.handleSubmit}>
                        <Input onChange={this.handleInput} autoHeight placeholder="Type a message..." value={this.state.message.body}/>
                    </Form>
                </div>
                <div className="groupshow-sidebar">
                    <SideBar className="side-bar"groupName={this.props.groups.name} names={result}/>
                </div>
            </div>
        );
    }
}

export default GroupShowMessages;




