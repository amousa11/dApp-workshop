import {
    INST_CONTRACT_SUCCESS,
    INST_CONTRACT_FAILURE
} from './home.actions';

const initialState = {
    web3: undefined,
    error: undefined
};

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case INST_CONTRACT_SUCCESS:
            return {
                contract: action.contract,
            };
        case INST_CONTRACT_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;