const initialState = {
    pros: [],
    cons: []
}
const GET_PROS = 'GET_PROS'
const GET_CONS = 'GET_CONS'
const ADD_PRO = 'ADD_PRO'
const ADD_CON = 'ADD_CON'
const DELETE_PRO = 'DELETE_PRO'
const DELETE_CON = 'DELETE_CON'

const getPros = pros => {
    return {
        type: GET_PROS,
        pros
    }
}
const getCons = cons => {
    return {
        type: GET_CONS,
        cons
    }
}

const addPro = pro => {
    return {
        type: ADD_PRO,
        pro
    }
}
const addCon = con => {
    return {
        type: ADD_CON,
        con
    }
}

const deletePro = id => {
    return {
        type: DELETE_PRO,
        id
    }
}
const deleteCon = id => {
    return {
        type: DELETE_CON,
        id
    }
}

//thunks


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROS:
            return action.pros
        case GET_CONS:
            return action.cons
        case ADD_PRO:
            return [...state.pros, action.pro]
        case ADD_CON:
            return [...state.cons, action.con]
        case DELETE_PRO:
            return state.filter(pro => pro.id !== pro.id)
        case DELETE_CON:
            return state.filter(con => con.id !== con.id)
        default:
            return state
    }
}
