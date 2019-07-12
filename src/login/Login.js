import React, {Component} from 'react'
import {ACCESS_TOKEN} from '../constants/Constants'
import {login} from '../util/AuthAPIUtils.js'
import {Link, Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import './Login.css'

class Login extends Component {


    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if (this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: {
                        from: this.props.location,
                        authenticated: true
                    }
                }}/>;
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <LoginForm {...this.props} handleSubmit={this.handleSubmit}
                               handleInputChange={this.handleInputChange}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.loadUser();
                this.props.history.push({
                    pathname: '/dashboard'
                });

            }).catch(error => {console.log(error.stack)
        });
    }

    render() {
        return (
            <div className="LoginModal">
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <div className="pantryIconLarge">
                        P
                    </div>
                    <div className="FormInputs">
                        <div className="FormItem">
                            <input type="email" name="email"
                                   className="TextFormInput" placeholder="Email"
                                   value={this.props.email} onChange={this.handleInputChange} required/>
                        </div>
                        <div className="FormItem">
                            <input type="password" name="password"
                                   className="TextFormInput" placeholder="Password"
                                   value={this.props.password} onChange={this.handleInputChange} required/>
                        </div>
                    </div>
                    <div className="FormButtons">
                        <button type="submit" className="LoginButton">Login</button>
                        <button className="ForgotLink"><Link className="Forgot" to="/forgot">I forgot my password</Link>
                        </button>
                    </div>
                    <p className="SignUpButtonFromLogin">New to Pantry? <Link className="SignUpLink" to="/signup">Signup
                        here.</Link></p>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);