import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../constants/Constants';
import { signup } from '../util/AuthAPIUtils.js'
import { Redirect } from 'react-router-dom'
import './SignUp.css';

class SignUp extends Component {
    componentDidMount() {
        // If the OAuth2 signup encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: this.props.location }
                }}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <SignUpForm {...this.props} />
                </div>
            </div>
        );
    }
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            profilePic: '',
            email: '',
            password: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const SignUpRequest = Object.assign({}, this.state);

        signup(SignUpRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.history.push("/");
            }).catch(error => {
        });
    }

    render() {
        return (
            <div className="SignUpModal">
                <form className="SignUpForm" onSubmit={this.handleSubmit}>
                    <div className="pantryIconLarge">
                        P
                    </div>
                    <div className="SignUpItem">
                        <input type="text" name="firstName"
                               className="TextFormInput" placeholder="First Name"
                               value={this.state.firstName} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SignUpItem">
                        <input type="text" name="lastName"
                               className="TextFormInput" placeholder="Last Name"
                               value={this.state.lastName} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SignUpItem">
                        <input type="email" name="email"
                               className="TextFormInput" placeholder="Email"
                               value={this.state.email} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SignUpItem">
                        <input type="password" name="password"
                               className="TextFormInput" placeholder="Password"
                               value={this.state.password} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SignUpton">
                        <button type="Submit" className="SignUpButton">Sign Up!</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;