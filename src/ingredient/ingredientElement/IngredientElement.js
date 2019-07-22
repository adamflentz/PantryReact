import React, {Component} from 'react';
import Modal from '../../globalComponents/modal/Modal';
import './IngredientElement.css'
import IngredientContent from '../ingredientContent/IngredientContent';

class IngredientElement extends Component {
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
                backgroundColor: 'grey',
                transition: '0.3s',
                margin: '0 auto'
            }
        } else {
            linkStyle = {
                backgroundColor: 'white',
                transition: '0.3s',
                margin: '0 auto'
            }
        }
        return (
            <div className="ingredientElement">
                <h1 style={linkStyle} onClick={this.toggleModal} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="pantryIngredientElement">{this.props.ingredient.name}</h1>
                <div className={showHideClassName}>
                    <Modal active={this.state.toggleModal} toggleModal={this.toggleModal}>
                        <IngredientContent ingredient={this.props.ingredient} />
                    </Modal>
                </div>
            </div>
            )
    }
}

export default IngredientElement;