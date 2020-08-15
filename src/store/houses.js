import firebase, { firebaseRef } from '../firebase/config'

const initialState = {
    houses: []
}

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'

const DELETE_HOUSE = 'DELETE_HOUSE'

const getAllHouses = houses => {
    return {
        type: GET_ALL_HOUSES,
        houses
    }
}
// const addHouse = house => {
//     return {
//         type: ADD_HOUSE,
//         house
//     }
// }

const deleteHouse = id => {
    return {
        type: DELETE_HOUSE,
        id
    }
}


//////thunk?


export const fetchHouses = (userId) => {
    return async dispatch => {
        let housesArr = []
        const houses = await firebase
            .firestore()
            .collection('users')
            .doc('a0gDe0l1W7OAufnvFGI5dGjVpMv1')
            .collection('houses')
            .get()
        houses.docs.forEach(doc => {
            housesArr.push(doc.data())
        })
        dispatch(getAllHouses(housesArr))
    }
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_HOUSES:
            return action.houses
        case DELETE_HOUSE:
            return state.filter(house => house.id !== action.id)
        default:
            return state
    }
}