import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu, Container, Form, Button, TextArea } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../../moments/moments_show/moment_show';
import SideBar from '../group_show_sidebar';


class GroupShowMessages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            body: '', 
            group_id: null
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSuccess = this.onSuccess.bind(this);

    }

    componentDidMount() {

        const App = window.App; 
        App.messages = App.cable.subscriptions.create('MessagesChannel', {

            received: function (data) {
                return $("#messages").append(this.renderMessage(data));
            },

            renderMessage: function (data) {
                return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
            }
        });
        
        this.props.requestGroup(this.props.groupId);

    }
    componentWillReceiveProps(newProps) {
        const messagesArr = this.props.messagesArr.map(message => (
            "<p> <b>" + this.props.users[message.user_id].username + ": </b>" + message.body + "</p>"
        ));
        $("#messages").append(messagesArr);

        this.setState({group_id: newProps.groupId});
    }
    
    componentWillUnmount() {
        const App = window.App; 
        App.messages.unsubscribe(); 
    }


    handleSubmit(event) {
        this.props.createMessage(this.state);

    }

    handleInput(event){
        this.setState({body: event.target.value});
    }

    onSuccess(result) {
        const client = filestack.init('ASwBXjnOHQ9DwYJeadUdZz');
        let cdnUrl = result.filesUploaded[0].url;

        client.storeURL(cdnUrl);

        let group = this.state;
        group.img_url = cdnUrl;
        this.props.updateGroup(group);

    }



    render() {


        const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system', 'facebook', 'googledrive', 'instagram', 'dropbox', 'imagesearch', 'webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        // let { usersArr, groups, moments } = this.props;

        // let name;
        // let imgUrl;
        let names; 
        // let header;

        // if (this.props.usersArr.length > 0) {
        //     let currentGroup = this.props.groups.currentGroup;

        //     name = groups.name;
        //     let baseUrl = groups.img_url;
        //     imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:400,height:800/' + baseUrl;

        //     names = usersArr.map(user => (
        //         <h2>{user.first_name} {user.last_name}</h2>
        //     ));

        //     moments = moments.map(moment => (
        //         <MomentShow
        //             users={this.props.users}
        //             moment={moment}
        //             createComment={this.props.createComment}
        //             currentUser={this.props.currentUser}
        //         />
        //     ));

        //     if (groups.img_url !== null) {
        //         header = (
        //             <div className="profile">
        //                 <img src={imgUrl} />
        //             </div>
        //         );
        //     } else {
        //         header = (
        //             <Header className="profile" as='h1' icon textAlign='center'>
        //                 <Icon name='users' circular />
        //                 <Header.Content>
        //                     {name}

        //                 </Header.Content>
        //             </Header>
        //         );
        //     }

        // } else {
        //     name = '';
        //     header = (
        //         <Header className="profile" as='h1' icon textAlign='center'>
        //             <Icon name='users' circular />
        //             <Header.Content>
        //                 {name}

        //             </Header.Content>
        //         </Header>

        //     );
        // }

        return (
            <div>
                <Container fluid className="messages-container">
                    Messages
                    <div id="messages">

                    </div>
                </Container>

                <Form onSubmit={this.handleSubmit}>
                    <TextArea onChange={this.handleInput} autoHeight placeholder="Type a message..." />
                    <Button onSubmit={this.handleSubmit}>Send</Button>
                </Form>
            </div>
        );
    }
}

export default GroupShowMessages;

