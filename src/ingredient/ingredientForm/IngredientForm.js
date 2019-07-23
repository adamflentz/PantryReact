import React, {Component} from 'react';
import Alert from 'react-s-alert';
import './IngredientForm.css';
import { addIngredient, addIngredientToPantry } from '../../util/PantryAPIUtils';

class IngredientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredientName: '',
            ingredientDescription: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const addIngredientRequest = Object.assign({}, this.state);

        addIngredient(addIngredientRequest).then((ingredientResponse) => {
            const addIngredientToPantryRequest = {
                ingredientId: ingredientResponse.id,
                pantryId: this.props.pantryId
            }
            addIngredientToPantry(addIngredientToPantryRequest).then((addResponse) => {
                Alert.success("Ingredient Successfully Added.")
                this.setState({
                    ingredientName: '',
                    ingredientDescription: ''
                })
                this.props.updatePantry(addResponse);
                this.props.toggleModal();
            })
        });

    }

    render() {
        return (
            <div className="IngredientForm">
                <form className="SignUpForm" onSubmit={this.handleSubmit}>
                    <div className="SignUpItem">
                        <input type="text" name="ingredientName"
                               className="TextFormInput" placeholder="Ingredient Name"
                               value={this.state.ingredientName} onChange={this.handleInputChange} required/>
                        <textarea name="ingredientDescription"
                               className="ParagraphFormInput" placeholder="Ingredient Description"
                               value={this.state.description} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SubmitButton">
                        <button type="Submit" className="SubmitButton">Add Ingredient</button>
                    </div>
                </form>
            </div>
            )
    }
}

export default IngredientForm;