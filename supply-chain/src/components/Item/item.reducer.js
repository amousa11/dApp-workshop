import {
  OPEN_ITEM,
  CLOSE_ITEM,
} from './item.actions';

const initialState = {
  isOpen: false
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case OPEN_ITEM:
      return {
        isOpen: true,
      };
    case CLOSE_ITEM:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};

export default reducer;