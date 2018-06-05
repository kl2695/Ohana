import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
    Input,
    Form,
    Checkbox,
    Image,
    Modal
} from 'semantic-ui-react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleDemoLogin = this.handleDemoLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.clearSessionErrors = this.clearSessionErrors.bind(this);
    }

  

    handleSignup(event) {
        event.preventDefault();
        this.props.signup(this.state)
            .then(() => this.props.history.push('/'))
            .then(() => this.props.clearSessionErrors());
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.login(this.state)
            .then(() => this.props.history.push('/'))
            .then(() => this.props.clearSessionErrors());
    }

    handleDemoLogin(event) {
        event.preventDefault();
        this.props.login({ username: 'demo', password: 'password' })
            .then(() => this.props.history.push('/'))
            .then(() => this.props.clearSessionErrors());
    }

    handleInput(field) {
        return (event) => (
            this.setState({ [field]: event.target.value })
        );
    }

    clearSessionErrors() {
        this.props.clearSessionErrors();
    }

    render() {

        let errors;
        let header; 
        if (this.props.errors) {
            errors = <div className="errors">{this.props.errors[0]}</div>;
        } else {
            errors = <p></p>;
        }

        header = (
            <div className="login-header">
                <Link to="/" onClick={this.clearSessionErrors}>
                    <h1>Ohana</h1>
                </Link>
            </div>);

        return (



            <div className='session_form-container'>

                {header}
    
                <div className='login-container'>
                    {errors}
                    
                    <form className="login-form">
                        <Input className='login-input' size='small' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                        <Input className='login-input' size='small' placeholder='Password' onChange={this.handleInput('password')} type='password' />
                        <Button id='button'onClick={this.handleLogin} size='small' color='red'>Log In</Button>
                        <Button id='button'onClick={this.handleDemoLogin} size='small' color='red'>Demo Log In</Button>
                    </form>
                </div>

            </div>
        );
    }


}

export default withRouter(LoginForm); 