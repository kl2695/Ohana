import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';
import SideBar from './group_show_sidebar';
import GroupShowMoments from './group_show_moments'; 
import GroupShowMessages from './group_show_messages';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
     

        this.handleSubmit = this.handleSubmit.bind(this);
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

        const { usersArr, messagesArr } = this.props; 
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

                <Route 
                    exact path='/groups/:groupId' 
                    component={GroupShowMoments}
                    users={this.props.users}
                    usersArr={usersArr}
                    groups={this.props.groups}
                    moments={this.props.moments}
                    createComment={this.props.createComment}
                    currentUser={this.props.currentUser}
                />
                <Route 
                    path='/groups/:groupId/messages'
                    component={GroupShowMessages} 
                    users={this.props.users}
                    groups={this.props.groups}
                    messages={this.props.messages}
                    messagesArr={messagesArr}
                />
            </div>
        );
    }


}

export default GroupShow; 