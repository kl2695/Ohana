import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import filestack from 'filestack-js';


class GroupShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.group;


        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount() {
    }


    componentWillReceiveProps(newProps) {

    }

    handleSubmit(event) {
        this.props.updateGroup(this.state);
    }



}