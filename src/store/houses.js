import { firebase, firebaseRef } from '../firebase/config'

const initialState = {
    houses: [],
    loading: true
}

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'
const ADD_HOUSE = 'ADD_HOUSE'
const DELETE_HOUSE = 'DELETE_HOUSE'

const allHouses = houses => {
    return {
        type: GET_ALL_HOUSES,
        houses
    }
}

const deleteHouse = id => {
    return {
        type: DELETE_HOUSE,
        id
    }
}
const addHouse = house => {
    return {
        type: ADD_HOUSE,
        house
    }
}

//////thunks
export const addNewHouse = (newHouse, userId) => {
    return async dispatch => {
        newHouse.id = Math.random() * 1000000000000000000000000
        const id = newHouse.id.toString()
        console.log(newHouse)
        await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(id)
            .set(newHouse)

        const house = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(id)
            .get()
        house.data()
        dispatch(addHouse(house.data()))
    }
}

export const fetchHouses = (userId) => {
    return async dispatch => {
        let housesArr = []
        const houses = await firebase
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

export const deleteHouseThunk = (userId, id) => {
    let stringId = id.toString()
    return async dispatch => {
        await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .delete()
        dispatch(deleteHouse(id))
    }
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_HOUSES:
            return { ...state, houses: action.houses, loading: false }
        case DELETE_HOUSE:
            return { ...state, houses: state.houses.filter((house) => { return house.id !== action.id }) }
        case ADD_HOUSE:
            return { ...state.houses, houses: [...state.houses, action.house] }
        default:
            return state
    }
}