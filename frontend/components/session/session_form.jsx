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
        if(newProps.errors){
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

        let errors; 
        let center; 
        let header; 

        center = (
            <div className='signup-container'>

                <h1>Create a New Account</h1>

                <Form onSubmit={this.handleSignup}>
                    <Form.Field>
                        <label>First Name</label>
                        <Input className='input' size='small' placeholder='First Name' onChange={this.handleInput('firstName')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <Input className='input' size='small' placeholder='Last Name' onChange={this.handleInput('lastName')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <Input className='input' size='small' placeholder='Email' onChange={this.handleInput('email')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <Input className='input' size='small' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input className='input' size='small' placeholder='Password' onChange={this.handleInput('password')} type='password' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button color='blue'size='small' type='submit'>Create Account</Button>
                </Form>

            </div>
        );

        header = (
            <div className='signup-header'>
                {errors}
                <form>
                    <Input className='input' size='small' placeholder='Username' onChange={this.handleInput('username')} type='text' />
                    <Input className='input' size='small' placeholder='Password' onChange={this.handleInput('password')} type='password' />
                    <Button onClick={this.handleLogin} size='small'>Log In</Button>
                    <Button onClick={this.handleDemoLogin} size='small' color='blue'>Demo Log In</Button>
                </form>
            </div>
        );

        if(this.props.errors){
            errors = this.props.errors[0];
        }else{
            errors = <p></p>;

           
        }
        
        return(


            
            <div className='session_form-container'>

                {header}
                {errors}

                {center}

                
            </div>
        );
    }


}

export default withRouter(SessionForm); 