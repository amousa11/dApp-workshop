import { takeLatest, put, call } from 'redux-saga/effects';
import {
  NEW_ITEM,
  newItemSuccess,
  newItemFailure
} from './newItem.actions';

function newItem(name, price) {
  console.log(name,price);
}


function* submitNewItem(action) {
  try {
    console.log("NAME", action.name);
    console.log("PRICE", action.price);
    const response = yield call(newItem, action.name, action.price);
    yield put(newItemSuccess(response));
  }
  catch(err)
  {
    yield put(newItemFailure(err));
  }
}

export default function* watchNewItemSubmit() {
  yield takeLatest(NEW_ITEM, submitNewItem);
}