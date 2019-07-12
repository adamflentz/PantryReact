import React, { Component } from 'react';
import './Dashboard.css';
import PantryList from '../globalComponents/js/PantryList';
import Recipe from '../globalComponents/js/Recipe';
import Activity from '../globalComponents/js/Activity';
import Featured from "../globalComponents/js/Featured";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

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
        return (
            <div className="Dashboard">
                <div className="PrimaryPanel">
                    <PantryList/>
                    <Recipe/>
                    <Activity/>
                </div>
                <div className="FeaturedRecipes">
                    <Featured/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
