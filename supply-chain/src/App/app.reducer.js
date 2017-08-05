import {
    INJECT_WEB3_SUCCESS,
    INJECT_WEB3_FAILURE
} from './app.actions';

const initialState = {
    web3: undefined,
    error: undefined
};

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case INJECT_WEB3_SUCCESS:
            return {
                web3: action.web3,
            };
        case INJECT_WEB3_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;