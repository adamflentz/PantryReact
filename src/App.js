import React, {Component} from 'react';
import './App.css';
import NavBar from './globalComponents/navbar/NavBar';
import Dashboard from './dashboard/Dashboard'
import UserPantry from './pantry/UserPantry'
import {ACCESS_TOKEN} from './constants/Constants';
import SignUp from './signup/SignUp'
import Alert from 'react-s-alert';
import {
    Route,
    Switch
} from 'react-router-dom';
import {getCurrentUser} from "./util/AuthAPIUtils";
import PrivateRoute from "./common/PrivateRoute";
import LoginPage from './globalComponents/login/loginPage/LoginPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true
        }
    }

    handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null,
            loading: false
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
            return (
            <div className="App">
                <header className="App-header">
                    <NavBar authenticated={this.state.authenticated} onLogout={this.handleLogout} loadUser={this.loadUser}/>
                </header>
                {!this.state.loading &&
                <Switch>
                    <PrivateRoute path={"/(dashboard|)"} authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser}
                                  component={Dashboard}/>
                    <PrivateRoute path="/pantry" authenticated={this.state.authenticated}
                                  currentUser={this.state.currentUser}
                                  component={UserPantry}/>
                    {/* <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>   */}
                    {/* <Route component={NotFound}></Route> */}
                    <Route path="/login"
                           render={(props) => <LoginPage authenticated={this.state.authenticated} {...props} loadUser={this.loadUser}/>}/>
                    <Route path="/signup"
                           render={(props) => <SignUp authenticated={this.state.authenticated} {...props} />}/>
                </Switch>
                }
            </div>
        );
    }
}

export default App;
