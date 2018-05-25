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
        
        console.log(this.state);

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
                const messages = fn.state.currentMessages;
               
                messages.push(message);
                return fn.setState({ currentMessages: messages });
            },

            renderMessage: function (data) {
                return data.user + ": " + data.message;
            }
        });

    }

    static getDerivedStateFromProps(nextProps, prevState, prevProps) {

        let currentSelected;

        if (nextProps.selectedMessages) {
            currentSelected = nextProps.selectedMessages.map(message => (
                nextProps.users[message.user_id].username + ": " + message.body
            ));
        }

        return {
            currentMessages: currentSelected,
            message: { body: prevState.message.body, group_id: prevState.message.group_id },
            groups: nextProps.groups,
        };
    }



    componentWillUnmount() {
        const App = window.App;
        App.messages.unsubscribe();
    }


    handleSubmit(event) {

        this.props.createMessage(this.state.message);
        this.setState({message: {body: '', group_id: this.state.message.group_id}});

        // let newMessage = this.props.users[this.props.currentUser.id].username 
        // + ": " + this.state.message.body;
        // let messagesArr = this.state.currentMessages;
        // messagesArr.push(newMessage); 


        // this.setState(() => {
        //     return { 
        //             currentMessages: messagesArr,
        //             message: { body: '', group_id: this.state.message.group_id },
        //         }; 
        // });
    }

    handleInput(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({ message: { body: event.target.value, group_id: this.state.message.group_id } });
    }

    loadMoreHistory() {

        return new Promise((resolve, reject) => {
            this.props.updateGroup({
                id: this.props.groupId,
                name: this.props.groups.name,
                img_url: this.props.groups.img_url,
                position: this.state.position + 30
            });
            this.setState({ position: this.state.position + 30 });
            resolve();
        });

    }

    render() {

        let { usersArr, groups } = this.props;
        let messages; 

     
        if(this.state.currentMessages.length > 0){
            messages = this.state.currentMessages.map(message => (
                <div>{message}</div>
            )).reverse();
        }else{
            messages = [];
        }
        


        return (
            <div className="right-groupshow">
                

                <Container fluid id="messages-container" textAlign="left">
                    Messages
                        <ChatView scrollLoadThreshold={50}
                        onInfiniteLoad={this.loadMoreHistory} flipped={true}>
                        {messages}
                    </ChatView>

                    <Form onSubmit={this.handleSubmit}>
                        <Input onChange={this.handleInput} autoHeight placeholder="Type a message..." value={this.state.message.body} />
                    </Form>
                </Container>


            </div>
        );
    }
}

export default ChatBox;




