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

export const getSingleHouseThunk = (house) => {
    return async dispatch => {
        console.log('got inside the thunk')
        let singleHouse = {}
        const oneHouse = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .get()
        houses.docs.forEach(doc => {
            housesArr.push(doc.data())
        })
        dispatch(allHouses(housesArr))
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