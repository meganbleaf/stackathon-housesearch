
const initialState = {
    houses: []
}

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'
const ADD_HOUSE = 'ADD_HOUSE'
const DELETE_HOUSE = 'DELETE_HOUSE'

const getAllHouses = houses => {
    return {
        type: GET_ALL_HOUSES,
        houses
    }
}
const addHouse = house => {
    return {
        type: GET_SINGLE_HOUSE,
        house
    }
}

const deleteHouse = id => {
    return {
        type: DELETE_HOUSE,
        id
    }
}


//////thunk?



export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_HOUSES:
            return action.houses
        case ADD_HOUSE:
            return [...state, action.house]
        case DELETE_HOUSE:
            return state.filter(house => house.id !== action.id)
        default:
            return state
    }
}