import { combineReducers } from 'redux'
// import { firebaseStateReducer } from 'react-redux-firebase'
import house from './house'
import houses from './houses'
import notes from './notes'
import prosandcons from './prosandcons'

const rootReducer = combineReducers({
    house,
    houses,
    notes,
    prosandcons,
    // firebase: firebaseStateReducer
})


export default rootReducer

