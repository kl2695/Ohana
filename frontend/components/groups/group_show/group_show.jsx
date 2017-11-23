import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.group;
        console.log(this.state);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount(){ 
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
        console.log(this.state);
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
        if(this.props.group){
            name = this.state.name;
            imgUrl = this.state.img_url; 
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

            </div>
        );
    }


}

export default GroupShow; 