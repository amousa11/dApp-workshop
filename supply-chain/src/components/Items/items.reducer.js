import {
    FETCH_ITEMS,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE
} from './items.actions';

const initialState = {
    items: undefined
};

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {
                items: action.items,
            };
        case FETCH_ITEMS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;