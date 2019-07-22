import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {getUserPantries} from '../../util/PantryAPIUtils.js'
import './PantryList.css';


class PantryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pantryList: []
        }
    }
    componentDidMount() {
        getUserPantries().then(response => {
            var responsePantryList = []
            response.forEach(element => {
                responsePantryList.push(element)
            });
            this.setState({
                loading: false,
                pantryList: responsePantryList
            })
        })
    }

    showPantry = (pantry) => {
        this.props.history.push({
            pathname: 'pantry',
            state: {
                pantryId: pantry.pantryId,
                pantryName: pantry.pantryName
            }
        })
    }

    render() {
        
        const pantries = this.state.pantryList.map((pantry, i) => {
            return <h1 className="pantryElement" key={i} onClick={() => {this.showPantry(pantry)}}> {pantry.pantryName} </h1>;
          });
        return (
            <div className="pantry">
                <div className="pantryContent">
                    <h1><a href="/pantry"  className="pantryLink">YOUR PANTRIES</a></h1>
                    {this.state.loading &&
                    <p>Loading...</p>
                    }
                    <div className="pantryList">
                    {!this.state.loading &&
                        pantries
                    }
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(PantryList);