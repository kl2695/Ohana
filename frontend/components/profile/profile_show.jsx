import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import { Image, Header, Icon } from 'semantic-ui-react';

class ProfileShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }
    componentDidMount(){
        this.props.requestAllUsers(); 
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
        console.log('im here'); 
        console.log(cdnUrl);
        client.storeURL(cdnUrl);

        let user = this.props.user; 
        user.img_url = cdnUrl; 
        console.log(user);
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
        if(this.props.user){
            imgUrl = this.props.user.img_url;
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
                    <MomentsIndex user={this.props.user} users={this.props.users} moments={this.props.moments}/>
                </div>
            </div>
        );
    }


}

export default withRouter(ProfileShow); 