import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import './LoginPage.css'
import LoginForm from '../loginForm/LoginForm';

class LoginPage extends Component {


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
                    <LoginForm {...this.props}/>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);