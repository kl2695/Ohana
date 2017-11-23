import React from 'react';
import { Button, Header, Icon, Image, Modal, Input } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';


const GroupForm = () => {
   

       const basicOptions = {
            accept: 'image/*',
            fromSources: ['facebook', 'gmail', 'github'],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        
        return(
       
                <Modal trigger={<p> Create A Group</p>}>
                    <Modal.Header>Create A Group</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <label>Name
                                    <Input type='text'></Input>
                                </label>
                                <ReactFilestack
                                    apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                                    buttonText="Upload Picture"
                                    buttonClass="classname"
                                    options={basicOptions}
                                />

                            </Modal.Description>
                        </Modal.Content>
                    <Modal.Actions>
                        <Button primary>
                            Proceed <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
        
        );
    };




export default GroupForm; 