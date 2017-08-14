import {
    INST_CONTRACT_SUCCESS,
    INST_CONTRACT_FAILURE,
    INJECT_WEB3_SUCCESS,
    INJECT_WEB3_FAILURE
} from './home.actions';

const initialState = {
    web3: undefined,
    contract: undefined,
    error: undefined
};

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case INST_CONTRACT_SUCCESS:
            return {
                contract: action.contract,
                web3: action.web3
            };
        case INST_CONTRACT_FAILURE:
            return {
                error: action.error,
            };
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