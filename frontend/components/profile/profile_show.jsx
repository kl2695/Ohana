import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import { Image, Header, Icon } from 'semantic-ui-react';
import MomentShow from '../moments/moments_show/moment_show';

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
        this.setState(newProps.users[newProps.match.params.userId]);
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
        
        if(moments.length > 0){
           
            let baseUrl = users[this.props.match.params.userId].img_url;
            imgUrl = 'https://process.filestackapi.com/ASwBXjnOHQ9DwYJeadUdZz/resize=width:600,height:1000/' + baseUrl;
            console.log(imgUrl);
            moments = moments.map(moment => (
                <MomentShow
                    users={users}
                    moment={moment}
                    createComment={this.props.createComment}
                    createLike={this.props.createLike}
                    currentUser={this.props.currentUser}
                />
            ));
        }else{
            imgUrl = '';
        }
        return (
                <div className="profile-container">
                    <div className="profile profile-pic">
                        <img src={imgUrl}/>
                        <ReactFilestack
                            apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                            buttonText="Update Profile Picture"
                            buttonClass="classname"
                            options={basicOptions}
                            onSuccess={this.onSuccess}
                            onError={(e) => console.log(e)}
                        />
                    </div>
                    <div className="moments">
                        {moments}
                    </div>
                </div>
        );
    }


}

export default withRouter(ProfileShow); 