import React, {Component} from 'react';
import Modal from '../../modal/Modal';
import './LoginButton.css';
import LoginForm from '../../login/loginForm/LoginForm';

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            toggleModal: false
        }
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    }

    toggleModal = () => {
        this.setState({toggleModal: !this.state.toggleModal})
    }

    displayModal = () => {
        this.setState({toggleModal: !this.state.toggleModal})
    }

    render() {
        const showHideClassName = this.state.toggleModal ? "modalDisplay" : "modalHide";
        return (
            <div className="ingredientElement">
                <button onClick={this.toggleModal} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="addIngredientButton">Login</button>
                <div className={showHideClassName}>
                    <Modal active={this.state.toggleModal} toggleModal={this.toggleModal}>
                        <LoginForm loadUser={this.props.loadUser}/>
                    </Modal>
                </div>
            </div>
            )
    }
}

export default LoginButton;