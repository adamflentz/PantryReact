import React, {Component} from 'react';
import './UserPantry.css';
import { getUserPantries, getPantry } from '../util/PantryAPIUtils';
import IngredientElement from './IngredientElement';

class UserPantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            pantry: null,
            ingredients: []
        }
    }


    componentDidMount() {
        console.log(this.props.location.state)
        if (this.props.location.state.pantryId == null) {
            getUserPantries().then(response => {
                var primaryPantryId = response.filter(element => (element.primaryPantry).pantryId
                )
                getPantry(primaryPantryId).then((response) => {
                    console.log(response.ingredientList)
                    this.setState({
                        loading: false,
                        pantry: response,
                        pantryName: response.pantryName,
                        ingredients: response.ingredientList
                    })
                })
            });
        }
        else {
            getPantry(this.props.location.state.pantryId).then((response) => {
                console.log(response.ingredientList)
                this.setState({
                    loading: false,
                    pantry: response,
                    pantryName: response.pantryName,
                    ingredients: response.ingredientList
                })
            })
        }
    }

    render() {
        console.log(this.state.pantry);
        const ingredients = this.state.ingredients.map((ingredient, i) => {
            return <IngredientElement key={i} ingredient={ingredient}/>
        });
        return (
            <div className="yourPantry">
                {!this.state.loading && 
                <h1 className="pantryTitle">{this.state.pantryName}</h1>
                }
                {this.state.loading && 
                <p>Loading...</p>}
                {!this.state.loading && 
                    ingredients
                }
            </div>
            )
    }

}

export default UserPantry;