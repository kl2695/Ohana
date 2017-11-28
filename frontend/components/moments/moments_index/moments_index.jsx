import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Feed, Icon, Button, Embed } from 'semantic-ui-react';
import CommentsIndex from '../../comments/comments_index/comments_index';
import MomentShow from '../moments_show/moment_show';

class MomentIndex extends React.Component{
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.props.requestAllUsers(); 
        this.props.requestAllMoments(); 
    }

     componentWillMount(){
    }

    render(){
        let moments; 
            if(this.props.moments.length > 0){

            moments = this.props.moments.map(moment => {

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
        }else{
        moments = [];

    }
            
        return(
            <div className="moments">
                {moments}
            </div>
        );
    }


}

export default MomentIndex; 