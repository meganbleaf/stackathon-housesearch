import { firebase } from '../firebase/config'

const initialState = {
    prosandcons: [],
    loading: true
}
const GET_PROS_AND_CONS = 'GET_PROS_AND_CONS'
const ADD_PROS_AND_CONS = 'ADD_PROS_AND_CONS'
const DELETE_PROS_AND_CONS = 'DELETE_PROS_AND_CONS'

const getProsAndCons = prosandcons => {
    return {
        type: GET_PROS_AND_CONS,
        prosandcons
    }
}


const addProsAndCons = prosandcons => {
    return {
        type: ADD_PROS_AND_CONS,
        prosandcons
    }
}

const deleteProsAndCons = id => {
    return {
        type: DELETE_PROS_AND_CONS,
        id
    }
}

//thunks
export const fetchProsAndCons = (houseId, userId) => {
    console.log('inside the thunk')
    const stringId = houseId.toString()
    console.log('string id in the thunk', stringId)
    return async dispatch => {
        let prosAndConsArr = []
        const pandcs = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .collection('prosandcons')
            .get()
        pandcs.docs.forEach(doc => {
            prosAndConsArr.push(doc.data())
        })
        console.log('pros and cons array', prosAndConsArr)
        dispatch(getProsAndCons(prosAndConsArr))
    }
}

export const addNew = (payload, userId, houseId) => {
    return async dispatch => {
        payload.id = Math.random() * 1000000000000000000000000
        const id = payload.id.toString()
        const stringId = houseId.toString()
        await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .collection('prosandcons')
            .doc(id)
            .set(payload)

        const newPandC = await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('houses')
            .doc(stringId)
            .collection('prosandcons')
            .doc(id)
            .get()
        newPandC.data()
        dispatch(addProsAndCons(newPandC.data()))
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROS_AND_CONS:
            return { ...state, prosandcons: action.prosandcons, loading: false }
        case ADD_PROS_AND_CONS:
            return { ...state.prosandcons, prosandcons: [...state.prosandcons, action.prosandcons] }
        // case DELETE_PROS_AND_CONS:
        // return state.filter(pro => pro.id !== pro.id)
        default:
            return state
    }
}
