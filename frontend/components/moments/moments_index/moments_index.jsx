import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image, Feed, Icon, Button, Embed, Form } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';
import MomentShow from '../moments_show/moment_show';
import ChatView from 'react-chatview';
import Promise from 'promise';
import MomentsFormContainer from '../moments_form/moments_form_container';

class MomentIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 15,
            clicked: false,
        };

        this.loadMoreHistory = this.loadMoreHistory.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.requestAllMoments(); 
        this.props.requestAllMessages(); 
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
        
        return (
            <div className="moments-index-container">
                
            
                <ChatView className="moments"scrollLoadThreshold={50}
                    onInfiniteLoad={this.loadMoreHistory}>
                    <MomentsFormContainer />
                    {moments}
                
                </ChatView>
            </div>
        );
    }


}

export default MomentIndex; 