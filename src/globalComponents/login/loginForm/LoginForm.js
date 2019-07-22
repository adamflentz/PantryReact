import React, {Component} from 'react'
import {ACCESS_TOKEN} from '../../../constants/Constants'
import {login} from '../../../util/AuthAPIUtils.js'
import {Link} from 'react-router-dom'
import './LoginForm.css'
import {withRouter} from 'react-router'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit = (event) => {
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

export default withRouter(LoginForm);