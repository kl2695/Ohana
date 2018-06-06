import React from 'react';
import { Button, Header, Icon, Image, Modal, Input, Form } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';


class GroupForm extends React.Component {
   
        constructor(props){
            super(props);
            this.state = {
                name: '',
                img_url: ''
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleInput = this.handleInput.bind(this); 
            this.onSuccess = this.onSuccess.bind(this);        }

        handleSubmit(event){
            this.props.createGroup(this.state)
            .then(() => React.unmountComponentAtNode(GroupForm))
            .then(() => this.props.history.push('/groups'));
           
        }

        handleInput(event){
            event.preventDefault();
            this.setState({name: event.target.value});
        }

        onSuccess (result){
            const client = filestack.init('ASwBXjnOHQ9DwYJeadUdZz');
            let cdnUrl = result.filesUploaded[0].url; 

            client.storeURL(cdnUrl);

            this.setState({img_url: cdnUrl});
        }

       render(){
           const basicOptions = {
            accept: 'image/*',
            fromSources: ['local_file_system','facebook','googledrive','instagram','dropbox','imagesearch','webcam',],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        let trigger; 
        if(this.props.navbar === true){
            trigger = <div> Create A Group</div>;
        }else{
            trigger = <Button color="blue"> Create A Group </Button>;
        }


        return(
       
                <Modal className="moment-modal" trigger={trigger}>
                    <Modal.Header>Create A Group</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Form>
                                    <label>Name
                                        <Input onChange={this.handleInput} type='text'></Input>
                                    </label>
                                    <ReactFilestack
                                        apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                                        buttonText="Upload Picture"
                                        buttonClass="filestack-buttons"
                                        options={basicOptions}
                                        onSuccess={this.onSuccess}
                                        onError={(e) => console.log(e)}
                                    />
                                 </Form>
                            </Modal.Description>
                        </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.handleSubmit}>
                            Create Group <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
        
        );
    }
 }




export default GroupForm; 