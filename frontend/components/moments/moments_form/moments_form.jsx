import React from 'react';
import { Button, Header, Icon, Image, Modal, Input, Form, TextArea} from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';
import MomentsFormContainer from "./moments_form_container";


class MomentsForm extends React.Component {
   
        constructor(props){
            super(props);
            this.state = {
                body: '',
                img_url: '', 
                user_id: this.props.currentUser.id,
                render_bool: true,
                group_id: null,
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleInput = this.handleInput.bind(this); 
            this.onSuccess = this.onSuccess.bind(this);   
        }

        componentWillReceiveProps(newProps){
            this.setState({group_id: newProps.currentGroupId});
        }

        componentDidMount(){
           
        }

        handleSubmit(event){
            const moment = this.state; 
            delete moment.render_bool; 
            this.props.createMoment(moment)
            .then(() => this.props.history.push('/'));
            this.setState({ render_bool: false });
            
           
        }

        handleInput(event){
            event.preventDefault();
            this.setState({body: event.target.value});
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

            if(this.render_bool === false){
                return (
                    <div></div>
                );

            }else{
                let trigger;
                if(this.props.navbar === true){
                    trigger = <p> Post a Moment </p>;
                }else{
                    trigger = (
                    <div className="post-form">
                        <Form>
                            <TextArea label="Post a Moment" placeholder="What's on your mind?" />
                        </Form>
                    </div>
                    );
                }

                let size = "small";
                
                return(
                    
                    <Modal className="moment-modal" trigger={trigger} size={size}>
                        <Modal.Header>Create A Moment</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Form className="post-form">
                                        <TextArea className="form-input"onChange={this.handleInput} type='text' placeholder="What's on your mind?"></TextArea>

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
                                Create Moment <Icon name='right chevron' />
                            </Button>
                        </Modal.Actions>
                    </Modal>
                                    
                                );
                            }

    }
 }




export default MomentsForm; 