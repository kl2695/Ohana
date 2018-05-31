import React from 'react';
import { List, Image, Header, Feed, Icon, Menu, Container, Form, Button, TextArea, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import SideBar from './group_show_messages_sidebar';
import ChatView from 'react-chatview';
import Promise from 'promise';



class GroupShowMessages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            groups: this.props.groups,
            currentGroup: this.props.currentGroup,
            currentMessages:[],
            message:{
                body: '', 
                group_id: null
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
        App.messages = App.cable.subscriptions.create('MessagesChannel', {

            received: function (data) {
                const message = this.renderMessage(data); 
                const messages = fn.state.currentMessages; 
                messages.push(message);
                return fn.setState({currentMessages: messages});
            },

            renderMessage: function (data) {
                return data.user + ": " + data.message;
            }
        });

        this.props.requestGroup(this.props.groupId);

    }

  static getDerivedStateFromProps(nextProps, prevState, prevProps) {

        let currentMessagesArr;
        
        if(nextProps.currentMessagesArr){
            currentMessagesArr = nextProps.currentMessagesArr.map(message => (
                nextProps.users[message.user_id].username + ": " + message.body 
            ));
        }

        return {
            currentMessages: currentMessagesArr,
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
                name: this.props.groups.name,
                img_url: this.props.groups.img_url,
                position:this.state.position + 30
            });
            this.setState({position: this.state.position + 30});
            resolve();
        });

    }

    render() {

        const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system', 'facebook', 'googledrive', 'instagram', 'dropbox', 'imagesearch', 'webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        let { usersArr, groups, moments } = this.props;
        let name;
        let imgUrl;
        let names;
        let header;
        let menu; 
        let result =[]; 

        if(this.props.users && this.state.currentGroup){
            name = this.state.currentGroup.name;

            menu = (
                <Menu tabular borderless className='nav-bar'>
                    <Menu.Item>
                        <Link to={`/groups/${this.state.currentGroup.id}`}>Moments</Link>
                    </Menu.Item>

                    <Menu.Item>
                        <Link to={`/groups/${this.state.currentGroup.id}/messages`}>Messages</Link>
                    </Menu.Item>
                </Menu>
            );

            names = Object.keys(this.props.users).map(userId => {
                let user = this.props.users[userId];
                if(!user.img_url){
                    user.img_url ='https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png';
                }
                return(

                    <List.Item>
                        <Image avatar src={user.img_url} />
                        <List.Content>
                            <List.Header as={Link}to={`/users/${userId}`}>{user.username}</List.Header>
                        </List.Content>
                    </List.Item>
                   
                
                );
            });

            for (let i = 0; i < names.length; i++) {
                if (i > 5) {
                    break;
                } else {
                    result.push(names[i]);
                }
            }

            if (groups.img_url !== "" && groups.img_url) {
                if (groups.img_url.includes('robohash')) {
                    imgUrl = groups.img_url;
                } else {
                    let baseUrl = groups.img_url;
                    imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:400,height:800/' + baseUrl;
                }
                header = (
                    <div className="profile">
                        <img src={imgUrl} />
                    </div>
                );

            } else {
                header = (
                    <Header className="profile" as='h1' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>
                            {name}
                        </Header.Content>
                    </Header>
                );
            }

       
            
        }else{
            menu = <div></div>;
            header = <div></div>;
        }

        const messages = this.state.currentMessages.map(message => (
            <div>{message}</div>
        )).reverse();


        return (
            <div className="right-groupshow">
                <div className="groupshow-header">
                    {header}
                    <ReactFilestack
                        apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                        buttonText="Update Group Picture"
                        buttonClass="filestack-buttons"
                        options={basicOptions}
                        onSuccess={this.onSuccess}
                        onError={(e) => console.log(e)}
                    />
                    {menu}
                </div>
                
                    <Container fluid className="messages-container" textAlign="left">
                        Messages
                        <ChatView scrollLoadThreshold={50}
                            onInfiniteLoad={this.loadMoreHistory} flipped={true}> 
                            {messages}
                        </ChatView>
                        
                        <Form onSubmit={this.handleSubmit}>
                            <Input onChange={this.handleInput} autoHeight placeholder="Type a message..." value={this.state.message.body} />
                        </Form>
                    </Container>

                    
                </div>
        );
    }
}

export default GroupShowMessages;




