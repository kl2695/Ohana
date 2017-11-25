import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, Button, Icon, Dropdown, Modal, Image } from 'semantic-ui-react';
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
                    <Menu className='nav-bar' inverted color='blue' tabular borderless icon>
                            <div className="right-nav-bar">
                                <Menu.Item 
                                    name='moments'
                                    active={activeItem === 'moments'}
                                    onClick={this.handleItemClick}
                                >
                                    <Icon circular name='home'/>
                                </Menu.Item>
                            
                                <Menu.Item
                                    name='groups'
                                    active={activeItem === 'groups'}
                                    onClick={this.handleItemClick}
                                >
                                    <Icon circular name='users' />
                                </Menu.Item>

                                <Menu.Item 
                                    name='profile'
                                    active={activeItem === 'profile'}
                                    onClick={this.handleItemClick}
                                >
                                    <Icon circular name='user' />
                                </Menu.Item>

                        <Dropdown text={this.props.currentUser.username}pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Header>Personal</Dropdown.Header>
                                        <Dropdown.Item >
                                            <GroupFormContainer/>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <MomentFormContainer/>
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