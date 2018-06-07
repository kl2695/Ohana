import React from 'react';
import { Button, Header, Icon, Image, Modal, Input, Form, Popup, TextArea} from 'semantic-ui-react';
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
                open: false, 
                group_id: null,
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleInput = this.handleInput.bind(this); 
            this.onSuccess = this.onSuccess.bind(this); 
            this.close = this.close.bind(this);
            this.show = this.show.bind(this);
        }

        componentWillReceiveProps(newProps){
            this.setState({group_id: newProps.currentGroupId});
        }

        componentDidMount(){
           
        }

        handleSubmit(event){
            const moment = this.state; 
            delete moment.render_bool; 
            this.close();
            this.props.createMoment(moment)
            .then(() => this.props.history.push('/'))
            .then(() => this.setState({body: ''}));
        }

        show() {
            this.setState({ open: true});
        }
        close() {
            this.setState({ open: false });
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

            if(this.state.render_bool === false){
                return (
                    <div></div>
                );

            }else{
                let trigger;
                if(this.props.navbar === true){
                    trigger = <div onClick={this.show}>Post a Moment </div>;
                }else{
                    trigger = (
                    <div className="post-form" onClick={this.show}>
                        <Form>
                            <TextArea label="Post a Moment" placeholder="What's on your mind?" value={this.state.body}/>
                        </Form>
                    </div>
                    );
                }

                let size = "small";
                
                return(
                    
                <Modal className="moment-modal" open={this.state.open} trigger={trigger} size={size}>
                        <i aria-hidden="true" class="close icon" onClick={this.close}></i>
                        <Modal.Header>Create A Moment</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Popup 
                                        trigger={<Form className="post-form">
                                            <TextArea className="form-input"onChange={this.handleInput} type='text' placeholder="What's on your mind?"></TextArea>

                                            <Popup 
                                                trigger={<ReactFilestack
                                                    apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                                                    buttonText="Upload Picture"
                                                    buttonClass="filestack-buttons"
                                                    options={basicOptions}
                                                    onSuccess={this.onSuccess}
                                                    onError={(e) => console.log(e)}
                                                    />}
                                                content="Upload or picture to add to your moment or take one yourself!"
                                                on="hover"
                                            />

                                            </Form>}
                                        content="Think of a moment as a moment in your life that you'd like to share with your friends"
                                        on="focus"
                                        position="top left"
                                        />
                                        
                                </Modal.Description>
                            </Modal.Content>
                        <Modal.Actions>
                            <Button primary onClick={this.handleSubmit}>
                                Create Moment <Icon name='right chevron'/>
                            </Button>
                        </Modal.Actions>
                    </Modal>
                                    
                                );
                            }

    }
 }




export default MomentsForm; 