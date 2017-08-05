export const FETCH_ITEMS = "FETCH_ITEMS";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const fetchItems = function () {
    return {
        type: FETCH_ITEMS,
    }
}

export const fetchItemsSuccess = function (items) {
    return {
        type: FETCH_ITEMS,
        items: items
    }
}

export const fetchItemsFailure = function (err) {
    return {
        type: FETCH_ITEMS,
        error: err
    }
}