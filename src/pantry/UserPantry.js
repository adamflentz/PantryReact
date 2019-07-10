import React, {Component} from 'react';
import './UserPantry.css';

class UserPantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            currentUser: null
        }
        this.loadPantry = this.loadPantry.bind(this);
    }

    loadPantry() {
        return;
    }
    render() {
        return (
            <h1><a href="/pantry"  className="pantryTitle">Your Pantry</a></h1>
        )
    }

}

export default UserPantry;