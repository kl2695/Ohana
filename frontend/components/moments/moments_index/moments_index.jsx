import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image, Feed, Icon, Button, Embed } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';
import MomentShow from '../moments_show/moment_show';
import ChatView from 'react-chatview';
import Promise from 'promise';

class MomentIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 15,
        };

        this.loadMoreHistory = this.loadMoreHistory.bind(this);

    }

    componentDidMount() {
        this.props.requestAllMoments(); 
    }

    loadMoreHistory() {
        return new Promise((resolve, reject) => {
            this.setState({ position: this.state.position + 15 });
            resolve();
        });
    }

    render() {
        let moments;
        if (this.props.moments.length > 0) {
            moments = this.props.moments.slice(0,this.state.position).map(moment => {
                return (
                    <MomentShow
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
            <div>
                    <ChatView className="moments"scrollLoadThreshold={50}
                        onInfiniteLoad={this.loadMoreHistory}>
                        {moments}
                    </ChatView>
            </div>
        );
    }


}

export default MomentIndex; 