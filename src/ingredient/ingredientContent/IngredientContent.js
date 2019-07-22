import React, {Component} from 'react';
import './IngredientContent.css';

class IngredientContent extends Component {

    render() {
        console.log(this.props);
        return(
                <div ref={this.setWrapperRef} className="ingredientContent">
                    <h1 onClick={this.props.toggleModal}>{this.props.ingredient.name}</h1>
                    <p>{this.props.ingredient.description}</p>
                </div>
        )
    }
}

export default IngredientContent;