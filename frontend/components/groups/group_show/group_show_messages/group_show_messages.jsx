import React from 'react';
import { List, Image, Header, Feed, Icon, Menu, Container, Form, Button, TextArea, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ChatView from 'react-chatview';
import Promise from 'promise';
import GroupShowHeader from '../group_show_header';



class GroupShowMessages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentGroup: this.props.currentGroup,
            currentMessages:[],
            message:{
                body: '', 
                group_id: this.props.groupId,
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
        App.messages = App.cable.subscriptions.create({ channel: 'MessagesChannel', room: fn.state.message.group_id },
        {
            received: function (data) {
                const message = this.renderMessage(data);
                const messages = fn.state.currentMessages;

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

        this.props.requestGroup(this.props.groupId);
    }

  static getDerivedStateFromProps(nextProps, prevState, prevProps) {
        return {
            currentMessages: nextProps.currentMessagesArr,
            message:{body: prevState.message.body,group_id: nextProps.groupId},
            groups: nextProps.groups,
            currentGroup: nextProps.currentGroup,
        };
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
                name: this.props.currentGroup.name,
                img_url: this.props.currentGroup.img_url,
                position:this.state.position + 30
            });
            this.setState({position: this.state.position + 30});
            resolve();
        });

    }

    render() {
        let groupShowHeader, prevUserId; 

        if(this.props.users && this.state.currentGroup){
            let currentGroup = this.state.currentGroup; 
            groupShowHeader = <GroupShowHeader currentGroup={currentGroup}/>;
        }else{
            groupShowHeader = <div></div>;
        }

        const messages = this.state.currentMessages.map(message => {
            let text = message.body; 
            let space, username;
            if(prevUserId && prevUserId!= message.user_id){
                space = true;
                username = this.props.users[message.user_id].username;
            }

            if(message.user_id === this.props.currentUser.id){
                prevUserId = message.user_id; 
                if(space){
                    return (
                        <div className="message-text-current-user-margin">
                            {text}
                        </div>
                    );
                }else{
                    return (
                        <div className="message-text-current-user">
                            {text}
                        </div>
                    );
                }
            }else{
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
        
        return (
            <div className="right-groupshow">
                {groupShowHeader}

                <div className="messages-container" textAlign="left">
                    <ChatView className="messages"
                        scrollLoadThreshold={50}
                        onInfiniteLoad={this.loadMoreHistory}
                            flipped={true}> 
                        {messages}
                    </ChatView>

                    <form className="messages-form" onSubmit={this.handleSubmit}>
                        <input className="messages-input"
                            onChange={this.handleInput}
                            autoHeight placeholder="Type a message..."
                            value={this.state.message.body} />
                    </form>
                </div>
            </div>
        );
    }
}

export default GroupShowMessages;




