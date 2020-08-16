import { firebase } from '../firebase/config'

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



export const getSingleHouseThunk = (id, user) => {
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
        default:
            return state
    }
}