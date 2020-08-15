import firebase from 'firebase'

const GET_USER = 'GET_USER'

const getUser = user => {
    return {
        type: GET_USER,
        user
    }
}

const initialState = {
    user: {}
}

export const getUserThunk = () => {
    return async dispatch => {
        try {
            let thisUser = {}
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    thisUser.email = user.email
                    thisUser.uid = user.uid,
                        thisUser.notes = user.notes
                } else {
                    thisUser = null
                }
            })
            dispatch(getUser(thisUser))
        } catch (error) {
            console.error(error)
        }
    }
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.user
        default:
            return state
    }
}