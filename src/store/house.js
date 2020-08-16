import { firebase } from '../firebase/config'

const initialState = {
    house: {}
}

const GET_SINGLE_HOUSE = 'GET_SINGLE_HOUSE'
const UPDATE_HOUSE = 'UPDATE_HOUSE'
const ADD_HOUSE = 'ADD_HOUSE'

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

const addHouse = house => {
    return {
        type: ADD_HOUSE,
        house
    }
}



//////thunk?

export const addNewHouse = (newHouse, userId) => {
    return async dispatch => {
        newHouse.id = Math.random() * 1000000000000000000000000
        const id = newHouse.id.toString()
        console.log(newHouse)
        const house = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(id)
            .set(newHouse)
        dispatch(addHouse(house))
    }
}

export const getSingleHouseThunk = (id, userId) => {
    console.log("inside the thunk")
    return async dispatch => {
        const oneHouse = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(id)
            .get()
        console.log('what is one house', oneHouse)
        dispatch(getSingleHouse(oneHouse))
    }


}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_HOUSE:
            return action.house
        case UPDATE_HOUSE:
            return action.house
        case ADD_HOUSE:
            return { ...state, house: action.house }
        default:
            return state
    }
}