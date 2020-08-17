import { firebase } from '../firebase/config'

const initialState = {
    house: {}
}

const GET_SINGLE_HOUSE = 'GET_SINGLE_HOUSE'
const UPDATE_HOUSE = 'UPDATE_HOUSE'

const updateHouse = house => {
    return {
        type: UPDATE_HOUSE,
        house
    }
}

const getSingleHouse = house => {
    return {
        type: GET_SINGLE_HOUSE,
        house
    }
}

//////thunk

export const getSingleHouseThunk = (id, userId) => {
    console.log("inside the thunk")
    const stringId = id.toString()
    return async dispatch => {
        const oneHouse = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .get()
        dispatch(getSingleHouse(oneHouse.data()))
    }

}
export const updateSingleHouseThunk = (userId, id, payload) => {
    let stringId = id.toString()
    return async dispatch => {
        await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .update(payload)

        const updatedHouse = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .get()
        dispatch(updateHouse(updatedHouse.data()))
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_HOUSE:
            return action.house
        case UPDATE_HOUSE:
            let updated = { ...state }
            updated.address = action.house.address
            updated.price = action.house.price
            updated.status = action.house.status
            return updated
        default:
            return state
    }
}