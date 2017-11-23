import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 
import { 
    Button, 
    Input, 
    Form, 
    Checkbox,
    Image
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


            
            <div className='session_form-container'>

                <div className='login-header'>
                    {errors}
                    <form onSubmit onSubmit={this.handleLogin}>
                        <Input className='input'size='small' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                        <Input className='input'size='small' placeholder='Password' onChange={this.handleInput('password')} type='password' />
                        <Button onSubmit={this.handleLogin} size='small'color='red'>Log In</Button>
                        <Button onSubmit={this.handleLogin} size='small'c  olor='red'>Log In</Button>
                    </form>
                </div>

                <div className = 'signup-container'>

                    <h1>Create a New Account</h1>

                    <Form onSubmit={this.handleSignup}>
                        <Form.Field>
                            <label>First Name</label>
                            <Input className='input'size='small' placeholder='First Name' onChange={this.handleInput('firstName')} type='text' />
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <Input className='input' size='small' placeholder='Last Name' onChange={this.handleInput('lastName')} type='text' />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input className='input' size='small'placeholder='Email' onChange={this.handleInput('email')} type='text' />
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <Input className='input' size='small'placeholder='Username' onChange={this.handleInput('username')} type='text' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input className='input' size='small'placeholder='Password' onChange={this.handleInput('password')} type='password' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button color='red' size='small'type='submit'>Create Account</Button>
                    </Form>

                </div>
            </div>
        );
    }


}

export default withRouter(SessionForm); 