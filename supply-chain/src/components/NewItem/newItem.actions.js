export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const NEW_ITEM = "NEW_ITEM";
export const NEW_ITEM_SUCCESS = "NEW_ITEM_SUCCESS";
export const NEW_ITEM_FAILURE = "NEW_ITEM_FAILURE";

export const openDialog = function () {
  return {
    type: OPEN_DIALOG,
    isOpen: true,
  }
}

export const closeDialog = function () {
  return {
    type: CLOSE_DIALOG,
    isOpen: false,
  }
}

export const newItem = function (name, price) {
  return {
    type: NEW_ITEM,
    name: name,
    price: price,
  }
}

export const newItemSuccess = function (response) {
  return {
    type: NEW_ITEM_SUCCESS,
    response: response
  }
}


export const newItemFailure = function (error) {
  return {
    type: NEW_ITEM_FAILURE,
    error: error,
  }
}