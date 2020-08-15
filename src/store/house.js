const initialState = {
    house: {}
}

const GET_SINGLE_HOUSE = 'GET_SINGLE_HOUSE'
const UPDATE_HOUSE = 'UPDATE_HOUSE'

const getSingleHouse = house => {
    return {
        type: GET_SINGLE_HOUSE,
        house
    }
}

const updateHouse = house => {
    return {
        type: UPDATE_HOUSE,
        house
    }
}




//////thunk?



export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_HOUSE:
            return action.house
        case UPDATE_HOUSE:
            return action.house
        default:
            return state
    }
}