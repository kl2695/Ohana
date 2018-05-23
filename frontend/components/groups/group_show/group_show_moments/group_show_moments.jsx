import React from 'react';
import { Grid, Image, Header, Feed, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../../moments/moments_show/moment_show';
import SideBar from '../group_show_sidebar';
import MomentsFormContainer from '../../../moments/moments_form/moments_form_container';


class GroupShowMoments extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            groups: this.props.groups,
            currentGroup: this.props.currentGroup,
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);

    }

    componentDidMount() {
        this.props.requestGroup(this.props.groupId);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.groupId != prevProps.groupId){
            this.props.requestGroup(this.props.groupId);
        }
    }

    handleSubmit(event) {
        this.props.updateGroup(this.state.groups.currentGroup);
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

        let { usersArr, groups, moments } = this.props;
        let name;
        let imgUrl;
        let names;
        let header;
        let menu; 

        console.log("checking props groupshowmoments");
        console.log(this.props);


        const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system', 'facebook', 'googledrive', 'instagram', 'dropbox', 'imagesearch', 'webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        if (this.state.groups.currentGroup && moments) {
            let currentGroup = this.props.groups.currentGroup;
            name = groups.name;

            


            moments = moments.map(moment => (
                <MomentShow
                    key={moment.id}
                    users={this.props.users}
                    moment={moment}
                    createComment={this.props.createComment}
                    createLike={this.props.createLike}
                    currentUser={this.props.currentUser}
                />
            )).reverse();

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

            if (groups.img_url !== "" && groups.img_url) {
                if(groups.img_url.includes('robohash')){
                    imgUrl = groups.img_url; 
                }else{
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
            

        } else {
            name = '';
            names= '';
            header = (
                <Header className="profile" as='h1' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>
                        {name}

                    </Header.Content>
                </Header>

            );
            menu = <div></div>;
        }

        return(
            <div className="groupshow-moments-container">
                {menu}
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

                </div>

                <div className="moments">
                    <MomentsFormContainer currentGroupId={this.props.groups.id}/>
                    {moments}
                </div>
            </div>
        );
    }
}

export default GroupShowMoments;