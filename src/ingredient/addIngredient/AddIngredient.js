import React, {Component} from 'react';
import Modal from '../../globalComponents/modal/Modal';
import './AddIngredient.css';
import IngredientForm from '../ingredientForm/IngredientForm'

class AddIngredient extends Component {
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
        var linkStyle;
        if (this.state.hover) {
            linkStyle = {
                color: '#A272AF',
                transition: '0.3s',
                fontSize: '10px',
            }
        } else {
            linkStyle = {
                color: '#D3ADFE',
                transition: '0.3s',
                fontSize: '10px',

            }
        }
        return (
            <div className="ingredientElement">
                <h1 style={linkStyle} onClick={this.toggleModal} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="addIngredientButton">Add Ingredient...</h1>
                <div className={showHideClassName}>
                    <Modal active={this.state.toggleModal} toggleModal={this.toggleModal}>
                        <IngredientForm pantryId={this.props.pantryId} toggleModal={this.toggleModal} updatePantry={this.props.updatePantry}/>
                    </Modal>
                </div>
            </div>
            )
    }
}

export default AddIngredient;