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
            selected: [],
        };

        this.loadMoreHistory = this.loadMoreHistory.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.props.requestAllMoments()
            .then(() => this.props.requestAllUsers());
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedGroups) {
            let selected; 
            if(Object.keys(nextProps.selectedGroups).length >= prevState.selected.length){
                selected = prevState.selected;
                Object.keys(nextProps.selectedGroups).forEach(groupId => {
                    if (!selected.includes(groupId)) {
                        selected.push(groupId);
                    }
                });
            }else{
                selected = prevState.selected.map(groupId => {
                    if(nextProps.selectedGroups[groupId]){
                        return groupId; 
                    }
                });
            }
            
            return {
                selected: selected,
                messages: nextProps.messages,
            };
        
        } else {
            return {
                selected: [],
            };
        }
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

        let moments, selected, chats, prevChats; 

        if (this.props.moments.length > 0) {
            moments = this.props.moments.slice(0,this.state.position).map(moment => {
                return (
                    <MomentShow
                        key={moment.id}
                        users={this.props.users}
                        moment={moment}
                        createComment={this.props.createComment}
                        createLike={this.props.createLike}
                        deleteLike={this.props.deleteLike}
                        currentUser={this.props.currentUser}
                    />
                );
            }
            );
        } else {
            moments = [];
        }


        if(this.state.selected.length > 0){
            chats = this.state.selected.map(groupId => {
                if(groupId){
                    let group = this.props.selectedGroups[groupId];
                    let selectedMessages = this.state.messages[groupId];

                    return (<ChatBoxContainer selectedMessages={selectedMessages}
                        groupId={groupId}
                        group={group}
                        users={this.props.users} />);
                }
               
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