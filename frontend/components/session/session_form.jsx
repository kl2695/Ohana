import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 
import { Button, Input } from 'semantic-ui-react';

class SessionForm extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            username: '', 
            password: '', 
            first_name: '', 
            last_name: '',
            email: '',
        }; 
        this.handleLogin = this.handleLogin.bind(this); 
        this.handleSignup = this.handleSignup.bind(this); 
    }

    handleSignup(event) {
        this.props.signup(this.state)
        .then(() => this.props.history.push('/'));
    }

    handleLogin(event) {
        this.props.login(this.state)
        .then(() => this.props.history.push('/'))
        .then(() => this.props.clearSessionErrors());
    }

    handleInput (field) {
        return (event) => (
                this.setState({[field]: event.target.value})
            );
        }

    render() {

        let errors; 
        if(this.props.errors){
            errors = this.props.errors[0]; 
        }
        
        return(
            <div className="session_form-container">
                <div className="login-header">
                    {errors}
                    <form onSubmit onSubmit={this.handleLogin}>
                            <Input className="input" placeholder="Username" onChange={this.handleInput('username')} type="text" />
                            <Input className="input" placeholder="Password" onChange={this.handleInput('password')} type="text" />
                        <Button onSubmit={this.handleLogin} color='red'>Log In</Button>
                    </form>
                </div>

                <div className = "signup-container">

                    <h1>Create a New Account</h1>

                    <form onSubmit={this.handleSignup}>

                        <ul className="input-list">
                            <li><Input className="input" placeholder="First Name"onChange={this.handleInput('firstName')} type="text" /></li>
                            <li><Input className="input" placeholder="Last Name" onChange={this.handleInput('lastName')} type="text" /></li>
                            <li><Input className="input" placeholder="Email" onChange={this.handleInput('email')} type="text" /></li>

                            <li><Input className="input"placeholder="Username"onChange={this.handleInput('username')} type="text" /></li>
                        
                            <li><Input className="input"placeholder="Password"onChange={this.handleInput('password')} type="text" /></li>
                        </ul>
                        
                        <Button onSubmit={this.handleSignup} color='red' className="signup-button">Sign Up</Button>

                    </form>
                </div>
            </div>
        );
    }


}

export default withRouter(SessionForm); 