// const initialState = {
//     prosAndCons =[]
// }
// const GET_PROS_AND_CONS = 'GET_PROS_AND_CONS'
// const ADD_PROS_AND_CONS = 'ADD_PROS_AND_CONS'
// const DELETE_PROS_AND_CONS = 'DELETE_PROS_AND_CONS'

// const getProsAndCons = prosAndCons => {
//     return {
//         type: GET_PROS_AND_CONS,
//         prosAndCons
//     }
// }


// const addProsAndCons = prosAndCons => {
//     return {
//         type: ADD_PROS_AND_CONS,
//         prosAndCons
//     }
// }

// const deleteProsAndCons = id => {
//     return {
//         type: DELETE_PROS_AND_CONS,
//         id
//     }
// }

// //thunks
// export const fetchProsAndCons = (userId, houseId) => {
//     const stringId = houseId.toString()
//     return async dispatch => {
//         let prosAndConsArr = []
//         const pandcs = await firebase
//             .firestore()
//             .collection('users')
//             .doc(userId)
//             .collection('houses')
//             .doc()
//             .get()
//         houses.docs.forEach(doc => {
//             housesArr.push(doc.data())
//         })
//         dispatch(allHouses(housesArr))
//     }
// }

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case GET_PROS:
//             return action.pros
//         case GET_CONS:
//             return action.cons
//         case ADD_PRO:
//             return [...state.pros, action.pro]
//         case ADD_CON:
//             return [...state.cons, action.con]
//         case DELETE_PRO:
//             return state.filter(pro => pro.id !== pro.id)
//         case DELETE_CON:
//             return state.filter(con => con.id !== con.id)
//         default:
//             return state
//     }
// }
