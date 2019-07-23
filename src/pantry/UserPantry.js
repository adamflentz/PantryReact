import React, {Component} from 'react';
import './UserPantry.css';
import { getUserPantries, getPantry } from '../util/PantryAPIUtils';
import IngredientElement from '../ingredient/ingredientElement/IngredientElement';
import AddIngredient from '../ingredient/addIngredient/AddIngredient';

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
        if (this.props.location.state == null || this.props.location.state.pantryId == null) {
            getUserPantries().then(response => {
                console.log(response)
                var primaryPantryId = response.find(element => 
                    (element.primaryPantry)
                ).pantryId;
                console.log(primaryPantryId)
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

    updatePantry = (newPantry) => {
        this.setState({
            pantry: newPantry,
            pantryName: newPantry.pantryName,
            ingredients: newPantry.ingredientList
        })
    }

    render() {
        console.log(this.state.pantry);
        const ingredients = this.state.ingredients.map((ingredient, i) => {
            return <IngredientElement key={i} ingredient={ingredient}/>
        });
        return (
            <div className="yourPantry">
                {!this.state.loading && 
                <div className="yourPantryTitleBarContainer">
                    <h1 className="pantryTitle">{this.state.pantryName}</h1>
                    <AddIngredient pantryId={this.state.pantry.pantryId} updatePantry={this.updatePantry}/>
                </div>
                }  
                {this.state.loading && 
                <p>Loading...</p>}
                {ingredients.length > 0 && 
                    <hr/>
                }
                {!this.state.loading && 
                <div className="ingredientContainer"> 
                    {ingredients}
                </div>
                }
            </div>
            )
    }

}

export default UserPantry;