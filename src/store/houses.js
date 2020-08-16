import { firebase, firebaseRef } from '../firebase/config'

const initialState = {
    houses: [],
    loading: true
}

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'

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


//////thunks


export const fetchHouses = (userId) => {
    return async dispatch => {
        console.log('got inside the thunk')
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


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_HOUSES:
            return { ...state, houses: action.houses, loading: false }
        case DELETE_HOUSE:
            return state.filter(house => house.id !== action.id)
        default:
            return state
    }
}