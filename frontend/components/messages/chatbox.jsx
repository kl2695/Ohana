import React from 'react';
import { List, Image, Header, Feed, Icon, Menu, Container, Form, Button, TextArea, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ChatView from 'react-chatview';
import Promise from 'promise';



class ChatBox extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentMessages: this.props.selectedMessages,
            message: {
                body: '',
                group_id: this.props.groupId,
            },
            position: 30,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.loadMoreHistory = this.loadMoreHistory.bind(this);
    }

    componentDidMount() {

        const App = window.App;
        let fn = this;

        App.messages = App.cable.subscriptions.create({ channel: 'MessagesChannel', room: fn.state.message.group_id},
         {
            received: function (data) {
                const message = this.renderMessage(data);
                const messages = Object.keys(fn.state.currentMessages).map(messageId => (
                    fn.state.currentMessages[messageId]
                ));
               
                messages.push(message);
                return fn.setState({ currentMessages: messages });
            },

             renderMessage: function (data) {
                 return {
                     body: data.message,
                     user_id: fn.props.currentUser.id,
                     group_id: fn.state.message.group_id,
                 };
             }
        });
    }

    static getDerivedStateFromProps(nextProps, prevState, prevProps) {
        if(nextProps.newMessages){
            return{
                currentMessages: nextProps.newMessages,
                message: { body: prevState.message.body, group_id: nextProps.groupId },
            };
        }else{
            return {
                currentMessages: nextProps.selectedMessages,
                message: { body: prevState.message.body, group_id: nextProps.groupId },
            };
        }
       
    }



    componentWillUnmount() {
        const App = window.App;
        App.messages.unsubscribe();
    }


    handleSubmit(event) {
        this.props.createMessage(this.state.message);
        this.setState({message: {body: '', group_id: this.state.message.group_id}});
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({ message: { body: event.target.value, group_id: this.state.message.group_id } });
    }

    handleClick(event){
        event.preventDefault(); 
        this.props.deSelectGroup(this.props.groupId);
    }

    loadMoreHistory() {

        return new Promise((resolve, reject) => {
            this.props.updateGroup({
                id: this.props.groupId,
                name: this.props.group.name,
                img_url: this.props.group.img_url,
                position: this.state.position + 30
            });
            this.setState({ position: this.state.position + 30 });
            resolve();
        });

    }

    render() {
        let messages; 
        let currentMessages = this.state.currentMessages;
        if(currentMessages){

            let prevUserId;
            messages = Object.keys(currentMessages).map(messageId => {
                let message = currentMessages[messageId];

                let text = message.body;
                let space;
                let username;

                if (prevUserId && prevUserId != message.user_id) {
                    space = true;
                    username = this.props.users[message.user_id].username;
                }

                if (message.user_id === this.props.currentUser.id) {
                    prevUserId = message.user_id;
                    if (space) {
                        return (
                            <div className="message-text-current-user-margin">
                                {text}
                            </div>
                        );
                    } else {
                        return (
                            <div className="message-text-current-user">
                                {text}
                            </div>
                        );
                    }
                } else {
                    prevUserId = message.user_id;
                    if (space) {
                        return (
                            <div>
                                <div className="username">{username}</div>
                                <div className="message-text-margin">
                                    {text}
                                </div>
                            </div>

                        );
                    } else {
                        return (
                            <div className="message-text">
                                {text}
                            </div>
                        );
                    }
                }
            }).reverse();
        }else{
            messages = [];
        }
        


        return (
            
            <div className="chatbox-container" textAlign="left">
                <div className="chatbox-header">
                    {this.props.group.name}
                    <Icon className="remove-button"name="remove" onClick={this.handleClick}/>
                </div>
                
                <ChatView className="chat-view"
                    scrollLoadThreshold={50}
                    onInfiniteLoad={this.loadMoreHistory} 
                    flipped={true}>
                    {messages}
                </ChatView>

                <form className="chatbox-form"onSubmit={this.handleSubmit}>
                    <input className="chatbox-input" 
                    onChange={this.handleInput} 
                    autoHeight placeholder="Type a message..." 
                    value={this.state.message.body}
                    autofocus />
                </form>
            </div>
        );
    }
}

export default ChatBox;




