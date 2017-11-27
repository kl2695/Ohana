import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import { Image, Header, Icon } from 'semantic-ui-react';
import { MomentShow } from '../moments/moments_show/moment_show';

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
        let { groups, moments, users } = this.props; 
        console.log(this.props);
        console.log(this.state);
        if(moments.length > 0){
            console.log('users');
            console.log(users);
            console.log(this.props.match.params.userId);
            imgUrl = users[this.props.match.params.userId].img_url;
            console.log('imgurl'); 
            console.log(imgUrl);
            console.log(moments);
            moments = moments.map(moment => (
                <MomentShow
                    users={this.props.users}
                    moment={moment}
                    createComment={this.props.createComment}
                    currentUser={this.props.currentUser}
                />
            ));
        }else{
            imgUrl = '';
        }
        return (
            <div>
                <div className="profile-container">

                    <img src={imgUrl} alt="Image uploaded with Filestack" title="Image uploaded with Filestack" />
                    <ReactFilestack
                        apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                        buttonText="Update Profile Picture"
                        buttonClass="classname"
                        options={basicOptions}
                        onSuccess={this.onSuccess}
                        onError={(e) => console.log(e)}
                    />
                   {moments}
                </div>
            </div>
        );
    }


}

export default withRouter(ProfileShow); 