import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MomentsIndex from '../moments/moments_index/moments_index_container';

class ProfileShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit(event) {
        this.props.login(this.state)
            .then(() => this.props.history.push('/'));
    }

    handleInput(field) {
        return (event) => (
            this.setState({ [field]: event.target.value })
        );
    }

    render() {
        return (
            <div>
                <div className="profile-container">
                    <MomentsIndex />
                </div>
            </div>
        );
    }


}

export default withRouter(ProfileShow); 