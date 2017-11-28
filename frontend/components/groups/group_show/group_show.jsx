import React from 'react';
import { Grid, Image, Header, Feed, Icon } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentShow from '../../moments/moments_show/moment_show';
import SideBar from './group_show_sidebar';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
     

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount(){ 
        this.props.requestGroup(this.props.groupId);
    }


    componentWillReceiveProps(newProps){

    }

    handleSubmit(event){
        this.props.updateGroup(this.state);
    }

    onSuccess (result){
        const client = filestack.init('ASwBXjnOHQ9DwYJeadUdZz');
        let cdnUrl = result.filesUploaded[0].url; 

        client.storeURL(cdnUrl);

        this.setState({img_url: cdnUrl});
     
        this.props.updateGroup(this.state);
        
    }
    
    render(){

      const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system','facebook','googledrive','instagram','dropbox','imagesearch','webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        let { usersArr, groups, moments } = this.props; 
        console.log(this.props);

        let name;
        let imgUrl; 
        let names; 

        if(this.props.usersArr.length > 0){
            let currentGroup = this.props.groups.currentGroup; 
    
            name = groups.name;
            imgUrl = groups.img_url; 

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
          
           
        }else{
            name = '';
            imgUrl = '';
        }

        return(
            <div className='groupshow-container'>
                <div>
                    <Header className='groupshow-profile'as='h1' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>
                            {name}
                            <ReactFilestack
                                apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                                buttonText="Update Group Picture"
                                buttonClass="upload-button"
                                options={basicOptions}
                                onSuccess={this.onSuccess}
                                onError={(e) => console.log(e)}
                            />
                        </Header.Content>
                    </Header>
                </div>
                <img src={imgUrl}/>
                <div className="moments">
                    {moments}
                </div>
                <div className='groupshow-top-bar'>
                    <SideBar class='groupshow-sidebar'names={names} />
                </div>
            </div>
        );
    }


}

export default GroupShow; 