import { getFirebase } from "react-redux-firebase"

const initialState = {
    notes: []
}
const GET_NOTES = 'GET_NOTES'
const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'

const getNotes = notes => {
    return {
        type: GET_NOTES,
        notes
    }
}

const addNote = note => {
    return {
        type: ADD_NOTE,
        note
    }
}

const deleteNote = id => {
    return {
        type: ADD_NOTE,
        id
    }
}

//thunks
export const addNoteThunk = (note) => {
    return (async (dispatch, getState, getFirebase) => {
        await getFirebase()
            .ref('notes')
            .push('note')
        dispatch(addNote(note))
    })
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTES:
            return action.notes
        case ADD_NOTE:
            return [...state, action.note]
        case DELETE_NOTE:
            return state.filter(note => note.id !== action.id)
        default:
            return state
    }
}
