import { allAPIs } from "../../axios"


const initialState = {
    info: {},
}

const SET_INFO = 'SET_INFO'

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO:
            return {
                ...state,
                info: action.info
            }
        default:
            return state
    }
}

const setInfo = (info) => ({ type: SET_INFO, info })

export const getInfoStore = () => async (dispatch) => {
    const info = await allAPIs.getContacts()
    dispatch(setInfo(info))
}





export default infoReducer;