import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import RNFirebase from 'react-native-firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import store from './store/createStore'
import App from '../App'

const fbConfig = {}


const rrfConfig = {
    userProfile: 'users'
}

const rrfProps = {
    firebase: RNFirebase,
    config: rrfConfig,
    dispatch: store.dispatch
}

firebase.initializeApp(fbConfig)

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>

        </Provider>
    )
}
