import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, Button, Icon, Dropdown, Modal, Image, Popup } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import GroupFormContainer from '../groups/group_form/group_form_container';
import MomentFormContainer from '../moments/moments_form/moments_form_container';
import createGroup from '../../actions/group_actions';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e,{name}){
        e.preventDefault();
        this.setState({activeItem: name});
        this.props.history.push(`/${name}`);
    }

    render(){
        const basicOptions = {
            accept: 'image/*',
            fromSources: ['facebook', 'gmail', 'github'],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        const {activeItem} = this.state;
            return(
                <Menu className='nav-bar' borderless icon>
                    <div className="right-nav-bar">
                        <Popup 
                            trigger={<Menu.Item 
                                name=''
                                active={activeItem === ''}
                                onClick={this.handleItemClick}
                            >
                                <Icon circular name='home'/>
                            </Menu.Item>}
                            content="See moments from all of your friends!"
                            on='hover'
                        />
                        <Popup
                            trigger={<Menu.Item
                                name='groups'
                                active={activeItem === 'groups'}
                                onClick={this.handleItemClick}
                            >
                                <Icon circular name='users' />
                            </Menu.Item>}
                            content="Chat with your different groups of friends!"
                            on='hover'
                        />
                        
                        <Popup 
                            trigger={<Menu.Item 
                                name={`users/${this.props.currentUser.id}`}
                            active={activeItem === `users/${this.props.currentUser.id}`}
                                onClick={this.handleItemClick}
                            >
                                <Icon circular name='user' />
                            </Menu.Item>}
                            content="Check out your own profile!"
                            on='hover'
                        />

                        <Dropdown text={this.props.currentUser.username}pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Header>Personal</Dropdown.Header>
                                        <Dropdown.Item >
                                            Create A Group
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <MomentFormContainer navbar={true}/>
                                        </Dropdown.Item>
                                        <Dropdown.Item>Send a Message</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Header>Settings</Dropdown.Header>
                                        <Dropdown.Item>Account Info</Dropdown.Item>
                                        <Dropdown.Item>Privacy</Dropdown.Item>
                                        <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
                                
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Menu>
            );
        }
}


export default NavBar; 