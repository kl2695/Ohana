import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';


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


        let name;
        let imgUrl; 
        let users;
        let names; 
        let moments; 
        let userMoments; 
        if(this.props.groups.currentGroup !== 'none'){
            let currentGroup = this.props.groups.currentGroup; 
    
            name = currentGroup.name;
            imgUrl = currentGroup.img_url; 
            users = currentGroup.users;
            // let userMomentIds = users.map(user => {
            //     let momentIds = [].concat.apply([],user.moment_ids);
            //     return momentIds; 
            // }); 

            names = users.map(user => (
                <h2>{user.first_name} {user.last_name}</h2>
            ));
            // userMoments = this.props.moments.map(moment => {
            //     if(use)
            // });
            // moments = this.props.moments.map(moment => (
            //     userMoments = this.props.moments.map(moment => {
            //         if()
            //     })
            //     <MomentShow
            //         user={this.props.user}
            //         users={this.props.users}
            //         moment={moment}
            //         createComment={this.props.createComment}
            //         currentUser={this.props.currentUser}
            //     />
            // ))
           
        }else{
            name = '';
            imgUrl = '';
        }

        return(
            <div>
                <Header as='h1' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>
                        {name}
                    </Header.Content>
                </Header>
                <ReactFilestack
                    apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                    buttonText="Update Group Picture"
                    buttonClass="classname"
                    options={basicOptions}
                    onSuccess={this.onSuccess}
                    onError={(e) => console.log(e)}
                />
                <img src={imgUrl} alt="Image uploaded with Filestack" title="Image uploaded with Filestack"/>
                {names}

            </div>
        );
    }


}

export default GroupShow; 