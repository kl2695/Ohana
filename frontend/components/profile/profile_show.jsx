import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import { Image, Header, Icon } from 'semantic-ui-react';
import MomentShow from '../moments/moments_show/moment_show';
import MomentsFormContainer from '../moments/moments_form/moments_form_container';

class ProfileShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
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


    handleSubmit(event) {
        this.props.updateUser(this.state);
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

        let user = this.state; 
        user.img_url = cdnUrl; 
        this.props.updateUser(user);

    }

    render() {


        const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system', 'facebook', 'googledrive', 'instagram', 'dropbox', 'imagesearch', 'webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        let imgUrl;
        let profilePic; 
        let { groups, moments, users } = this.props; 
        
        if(moments.length > 0){
            let baseUrl; 

            if(this.props.match.params.userId == this.props.currentUser.id){
                baseUrl = this.props.currentUser.img_url;

                if (baseUrl !== null && baseUrl !== "") {

                    imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:600,height:1000/' + baseUrl;
                } else {
                    imgUrl = 'https://image.flaticon.com/icons/svg/17/17004.svg';
                }

                profilePic = (
                    <div className="profile-pic">
                        <img src={imgUrl} />
                        <ReactFilestack
                            apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                            buttonText="Update Profile Picture"
                            buttonClass="classname"
                            options={basicOptions}
                            onSuccess={this.onSuccess}
                            onError={(e) => console.log(e)}
                        />
                    </div>
                );

            }else{

                baseUrl = users[this.props.match.params.userId].img_url;

                if (baseUrl !== null && baseUrl !== "") {

                    imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:600,height:1000/' + baseUrl;
                } else {
                    imgUrl = 'https://image.flaticon.com/icons/svg/17/17004.svg';
                }

            
                profilePic = (
                    <div className="profile-pic">
                        <img src={imgUrl} />
                    </div>
                );
            }


            moments = moments.map(moment => (
                <MomentShow
                    key={moment.id}
                    users={users}
                    moment={moment}
                    createComment={this.props.createComment}
                    createLike={this.props.createLike}
                    currentUser={this.props.currentUser}
                />
            )).reverse();
        }else{
            imgUrl = '';
        }



        return (
                <div className="profile-container">
                    {profilePic}

                    <div className="profile-moments">
                        <MomentsFormContainer />
                        {moments}
                    </div>
                </div>
        );
    }


}

export default withRouter(ProfileShow); 