import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';


class GroupShowMoments extends React.Component {


    constructor(props){
        super(props);
        this.state = {};


        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);

    }

    componentDidMount() {
        this.props.requestGroup(this.props.groupId);
        this.setState(this.props.groups);

    }

    componentWillReceiveProps(newProps) {
        this.setState(newProps.groups);
    }

    handleSubmit(event) {
        this.props.updateGroup(this.state);
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
        console.log(this.props);

        let { usersArr, groups, moments } = this.props;

        let name;
        let imgUrl;
        let names;
        let header;

        if (this.props.usersArr.length > 0) {
            let currentGroup = this.props.groups.currentGroup;

            name = groups.name;
            let baseUrl = groups.img_url;
            imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:400,height:800/' + baseUrl;

            names = usersArr.map(user => (
                <h2>{user.first_name} {user.last_name}</h2>
            ));

            moments = moments.map(moment => (
                <MomentShow
                    users={this.props.users}
                    moment={moment}
                    createComment={this.props.createComment}
                    currentUser={this.props.currentUser}
                />
            ));

            if (groups.img_url !== null) {
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

        } else {
            name = '';
            header = (
                <Header className="profile" as='h1' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>
                        {name}

                    </Header.Content>
                </Header>

            );
        }

        return(
            <div>
                <div className="groupshow-left-bar">
                    {header}
                    <ReactFilestack
                        apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                        buttonText="Update Group Picture"
                        buttonClass="upload-button"
                        options={basicOptions}
                        onSuccess={this.onSuccess}
                        onError={(e) => console.log(e)}
                    />
                    <SideBar class='groupshow-sidebar' names={names} />
                </div>

                <div className="moments">
                    {moments}
                </div>
            </div>
        );
    }
}

export default GroupShowMoments;