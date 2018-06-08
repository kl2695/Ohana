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
        this.handleDemoLogin = this.handleDemoLogin.bind(this); 
        this.handleSignup = this.handleSignup.bind(this); 
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if(newProps.errors && newProps.errors.length === 1){
            this.props.history.push('/login'); 
        }
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
        this.props.login({username: 'demo', password: 'password'})
        .then(() => this.props.history.push('/'))
        .then(() => this.props.clearSessionErrors());
    }

    handleInput (field) {
        return (event) => (
                this.setState({[field]: event.target.value})
            );
        }

    render() {

        let errors, center, header, footer; 
        center = (
            <div className='signup-container'>
                <h1>Sign up for your free account</h1>

                <Form className="signup-form"onSubmit={this.handleSignup}>
                    <Form.Field className="signup-field">
                        <Input className='input' size='large' placeholder='First Name' onChange={this.handleInput('first_name')} type='text' />
                        <Input className='input' size='large' placeholder='Last Name' onChange={this.handleInput('last_name')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <Input className='input' size='large' placeholder='Email' onChange={this.handleInput('email')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <Input className='input' size='large' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <Input className='input' size='large' placeholder='Password (min. 6 characters)' onChange={this.handleInput('password')} type='password' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button color='blue'size='large' type='submit' className="filestack-buttons">Create Account</Button>
                </Form>
            </div>
        );

        header = (
            <div className='signup-header-container'>
                <div className='signup-header'>
                    <h1 className="headers">Ohana</h1>
                    {errors}
                    <form>
                        <Input className='input' size='mini' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                        <Input className='input' size='mini' placeholder='Password' onChange={this.handleInput('password')} type='password' />
                        <Button onClick={this.handleLogin} size='mini'>Log In</Button>
                        <Button onClick={this.handleDemoLogin} size='mini' color='blue'>Demo Log In</Button>
                    </form>
                </div>
            </div>
        );

        footer = (
            <div className="footer-container">
                <div className="footer">
                    <a className="footer-icons"href="https://github.com/kl2695/Ohana">
                        <i class="fab fa-github fa-2x"></i>
                    </a>
                    <a className="footer-icons"href="https://www.linkedin.com/in/kevin-lee-34a9aa2a/"> 
                        <i class="fab fa-linkedin fa-2x"></i>
                    </a>
                </div>  
            </div>
        );
        if(this.props.errors){
            errors = this.props.errors.map(error => (
                <div className="errors">{error}</div>
            ));
        }else{
            errors = <p></p>;
        }
        
        return(
            <div className='session_form-container'>
                {header}
                {errors}
                {center}
                {footer}
            </div>
        );
    }
}

export default withRouter(SessionForm); 