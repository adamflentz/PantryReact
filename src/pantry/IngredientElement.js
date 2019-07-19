import React, {Component} from 'react';
import IngredientModal from './IngredientModal';
import './IngredientElement.css'

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
                transition: '0.3s'
            }
        } else {
            linkStyle = {
                backgroundColor: 'white',
                transition: '0.3s'
            }
        }
        return (
            <div className="ingredientElement">
                <h1 style={linkStyle} onClick={this.toggleModal} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="pantryIngredientElement">{this.props.ingredient.name}</h1>
                <div className={showHideClassName}>
                    <IngredientModal active={this.state.toggleModal} toggleModal={this.toggleModal} ingredient={this.props.ingredient}/>
                </div>
            </div>
            )
    }
}

export default IngredientElement;