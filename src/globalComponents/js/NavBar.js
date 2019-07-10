import React, {Component} from 'react';
import '../css/NavBar.css';

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
                </div>
            </div>
        )
    }

}

export default NavBar;