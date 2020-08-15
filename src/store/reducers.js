import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import house from './house'
import houses from './houses'
import notes from './notes'
import prosandcons from './prosandcons'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        house: house,
        houses: houses,
        notes: notes,
        prosandcons: prosandcons,
        firebase: firebaseStateReducer,
        ...asyncReducers
    })
}

export default makeRootReducer

// // Useful for injecting reducers as part of async routes
// export const injectReducer = (store, { key, reducer }) => {
//   store.asyncReducers[key] = reducer
//   store.replaceReducer(makeRootReducer(store.asyncReducers))
// }