import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';
import SideBar from './group_show_sidebar';
import GroupShowMomentsContainer from './group_show_moments/group_show_moments_container'; 
import GroupShowMessagesContainer from './group_show_messages/group_show_messages_container';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
     

        this.handleItemClick = this.handleItemClick.bind(this);
    }


    componentDidMount() {
        this.props.requestGroup(this.props.groupId);
        this.setState(this.props.groups);
        
    }

    componentWillReceiveProps(newProps) {
        this.setState(newProps.groups);
    }



    handleItemClick(e, { name }) {
        e.preventDefault();
        this.setState({ activeItem: name });
        this.props.history.push(`/groups/${this.props.groupId}/${name}`);
    }

    
    render(){

        const { usersArr, messagesArr, users, groups, moments, createComment, currentUser } = this.props; 
        const {activeItem} = this.state; 


        return(

            <div className='groupshow-container'>
                <Menu className='nav-bar' tabular borderless>
                    <div className="right-nav-bar">
                        <Menu.Item
                            name=''
                            active={activeItem === ''}
                            onClick={this.handleItemClick}
                        >
                        </Menu.Item>

                        <Menu.Item
                            name='messages'
                            active={activeItem === 'messages'}
                            onClick={this.handleItemClick}
                        >
                        </Menu.Item>
                    </div>
                </Menu>
                <Switch>
                    <Route 
                        exact path='/groups/:groupId' 
                        component={GroupShowMomentsContainer}
                            
                    />
                    <Route 
                        path='/groups/:groupId/messages'
                        component={GroupShowMessagesContainer} 
                    />
                </Switch>
            </div>
        );
    }


}

export default GroupShow; 