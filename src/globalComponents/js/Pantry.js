import React, {Component} from 'react';
import '../css/Pantry.css';

class Pantry extends Component {
    

    render() {
        return (
            <div className="pantry">
                <h1><a href="/pantry"  className="pantryLink">YOUR PANTRIES</a></h1>
            </div>
        )
    }

}

export default Pantry;