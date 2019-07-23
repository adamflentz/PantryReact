import { PANTRY_API_BASE_URL, ACCESS_TOKEN } from '../constants/Constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    ); 
};

export function getUserPantries() {
    if (localStorage.getItem(ACCESS_TOKEN) == null) {
        return Promise.reject("No user provided");
    }

    return request({
        url: PANTRY_API_BASE_URL + "/pantry/mypantries"
    })

}

export function getPantry(id) {
    if (localStorage.getItem(ACCESS_TOKEN) == null) {
        return Promise.reject("No user provided");
    }

    return request({
        url: PANTRY_API_BASE_URL + "/pantry/pantry?id=" + id
    })

}

export function addIngredient(ingredientRequest) {
    if (localStorage.getItem(ACCESS_TOKEN) == null) {
        return Promise.reject("No user provided");
    }

    return request({
        url: PANTRY_API_BASE_URL + "/ingredient/create",
        method: 'POST',
        body: JSON.stringify(ingredientRequest)
    })
}

export function addIngredientToPantry(addIngredientToPantryRequest) {
    if (localStorage.getItem(ACCESS_TOKEN) == null) {
        return Promise.reject("No user provided");
    }

    return request({
        url: PANTRY_API_BASE_URL + "/pantry/addingredient",
        method: 'POST',
        body: JSON.stringify(addIngredientToPantryRequest)
    })
}