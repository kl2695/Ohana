import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';


class GroupShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentDidMount(){ 
        this.props.requestGroup(this.props.groupId);
    }

    componentWillReceiveProps(newProps){

    }

    onSuccess(){
       
    }
    
    render(){

       const basicOptions = {
            accept: 'image/*',
            fromSources: ['facebook', 'gmail', 'github'],
            maxSize: 1024 * 1024,
            maxFiles: 3,
        };

        let name;
        
        if(this.props.group){
            name = this.props.group.name;
        }else{
            name = '';
        }

        return(
            <div>
                {name}
                <ReactFilestack
                    apikey={'ASwBXjnOHQ9DwYJeadUdZz'}
                    buttonText="Upload Files"
                    buttonClass="classname"
                    options={basicOptions}
                    onSuccess={this.onSuccess}
                />
            </div>
        );
    }


}

export default GroupShow; 