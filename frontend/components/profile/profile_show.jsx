import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import { Image, Header, Icon } from 'semantic-ui-react';
import MomentShow from '../moments/moments_show/moment_show';
import MomentsFormContainer from '../moments/moments_form/moments_form_container';
import ChatSideBarContainer from '../messages/chat_sidebar_container'
import ChatBoxContainer from '../messages/chatbox_container';

class ProfileShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInput = this.handleInput.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }


    componentDidMount(){
        this.props.requestUser(this.props.userId);
        this.setState(this.props.users[this.props.userId]);
    }

    componentWillReceiveProps(newProps){
        if(newProps.userId != this.props.userId){
            let newId = newProps.userId;

            this.props.requestUser(newId);
            this.setState(this.props.users[newId]);
        }
       
    }



    handleInput(field) {
        return (event) => (
            this.setState({ [field]: event.target.value })
        );
    }

    onSuccess(result) {
        const client = filestack.init('ASwBXjnOHQ9DwYJeadUdZz');
        let cdnUrl = result.filesUploaded[0].url;
 
        client.storeURL(cdnUrl);

        let user = this.props.users[this.props.match.params.userId];
        user.img_url = cdnUrl; 
        this.props.updateUser(user);

    }

    render() {

        let { groups, users } = this.props; 
        let imgUrl;
        let baseUrl; 
        let profilePic;
        let updateButton;
        let moments;
        let name; 

        const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system', 'facebook', 'googledrive', 'instagram', 'dropbox', 'imagesearch', 'webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };
        
        let user = users[this.props.match.params.userId]; 

        if(user && this.props.moments.length > 0){
            name = user.first_name + " " + user.last_name; 
            baseUrl = user.img_url;

            if(user.img_url.includes('robohash')){
                imgUrl = user.img_url;
            }else if (baseUrl !== null && baseUrl !== "") {
                imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:600,height:1000/' + baseUrl;
            }else {
                imgUrl = 'https://image.flaticon.com/icons/svg/17/17004.svg';
            }

            profilePic = (
                <div className="profile-image-container">
                    <img className="profile-image" src={imgUrl} width="350"height="350"/>
                </div>
            );

            updateButton = (
                <ReactFilestack
                    apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                    buttonText="Update Profile Picture"
                    buttonClass="update-button"
                    options={basicOptions}
                    onSuccess={this.onSuccess}
                    onError={(e) => console.log(e)}
                />
            );


            moments = this.props.moments.map(moment => (
                <MomentShow
                    key={moment.id}
                    users={users}
                    moment={moment}
                    createComment={this.props.createComment}
                    createLike={this.props.createLike}
                    deleteLike={this.props.deleteLike}
                    currentUser={this.props.currentUser}
                />
            )).reverse();
        }else{
            imgUrl = '';
            moments = <div></div>;
            name = "";
        }



        return (
                <div className="profile-container">
                    <div className="profile-left-container">
                        <h1 className="profile-name">{name}</h1>
                        {profilePic}
                        {updateButton}
                    </div>
                    <div className="profile-moments-container">
                        <div className="profile-moments">
                            <MomentsFormContainer />
                            {moments}
                        </div>
                    </div>
                    
                </div>
        );
    }


}

export default withRouter(ProfileShow); 