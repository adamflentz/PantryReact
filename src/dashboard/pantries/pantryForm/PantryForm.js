import React, {Component} from 'react';
import './PantryForm.css';
import { addPantry } from '../../../util/PantryAPIUtils';

class PantryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pantryName: ''
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

        const addPantryRequest = Object.assign({}, this.state);

        addPantry(addPantryRequest).then((response) => {
            this.props.getUserPantries();
        })

    }   

    render() {
        return (
            <div className="PantryFormContainer">
                <form className="PantryForm" onSubmit={this.handleSubmit}>
                    <div className="PantryItem">
                        <input type="text" name="pantryName"
                               className="TextFormInput" placeholder="Pantry Name"
                               value={this.state.pantryName} onChange={this.handleInputChange} required/>
                    </div>
                    <div className="SubmitButton">
                        <button type="Submit" className="SubmitButton">Add Pantry</button>
                    </div>
                </form>
            </div>
            )
    }
}

export default PantryForm;