import React, {Component} from 'react';
import './NavBar.css';
import LoginButton from './loginButton/LoginButton';

class NavBar extends Component {

    render() {
        return (
            <div className="NavBar">
                <div className="pantryIcon">
                    <p><a href="/">P</a></p>
                </div>
                <div className="Profile">
                {this.props.authenticated &&
                    <button className="LogoutButton" onClick={this.props.onLogout}>Logout</button>
                }
                {!this.props.authenticated && 
                    <LoginButton loadUser={this.props.loadUser}/>
                }
                </div>
            </div>
        )
    }

}

export default NavBar;