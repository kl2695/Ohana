import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image, Feed, Icon, Button, Embed, Form } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';
import MomentShow from '../moments_show/moment_show';
import ChatView from 'react-chatview';
import Promise from 'promise';
import MomentsFormContainer from '../moments_form/moments_form_container';
import ChatSideBarContainer from '../../messages/chat_sidebar_container';
import ChatBox from '../../messages/chatbox';
import ChatBoxContainer from '../../messages/chatbox_container';

class MomentsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            position: 15,
            clicked: false,
        };

        this.loadMoreHistory = this.loadMoreHistory.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.requestAllMoments()
        .then(()=>this.props.requestAllUsers());
    }

    loadMoreHistory() {
        return new Promise((resolve, reject) => {
            this.setState({ position: this.state.position + 15 });
            resolve();
        });
    }

    handleClick(event){
        this.setState({clicked:true});
    }


    scroll(){
    }

    render() {

        let moments;
        let selected;
        let chats; 

        if (this.props.moments.length > 0) {
            moments = this.props.moments.slice(0,this.state.position).map(moment => {
                return (
                    <MomentShow
                        key={moment.id}
                        users={this.props.users}
                        moment={moment}
                        createComment={this.props.createComment}
                        createLike={this.props.createLike}
                        currentUser={this.props.currentUser}
                    />
                );
            }
            );
        } else {
            moments = [];

        }

        if(this.props.selectedGroups){
            selected = Object.keys(this.props.selectedGroups);
            chats = selected.map(groupId => {
                let group = this.props.selectedGroups[groupId];
                let selectedMessages = []; 
                this.props.messagesArr.forEach(message => {
                    
                    if(message.group_id == groupId){
                        selectedMessages.push(message);
                    }


                });
                return (<ChatBoxContainer selectedMessages={selectedMessages} 
                    onMessageSubmission={this.onMessageSubmission}
                    groupId={groupId}
                    group={group}
                    users={this.props.users}/>);
            });
        }

                
        return (
            <div className="moments-index-container">
                <div className="moments-index-top">
                    <ChatView className="moments"scrollLoadThreshold={50}
                        onInfiniteLoad={this.loadMoreHistory}>
                        <MomentsFormContainer />
                        {moments}
                    
                    </ChatView>
                    <ChatSideBarContainer/>
                </div>
                <div className="moments-index-chats-container">
                    {chats}
                </div>
            </div>
        );
    }


}

export default MomentsIndex; 