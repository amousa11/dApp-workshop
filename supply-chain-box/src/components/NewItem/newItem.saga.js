import { takeLatest, put, call } from 'redux-saga/effects';
import {
  NEW_ITEM,
  newItemSuccess,
  newItemFailure
} from './newItem.actions';
import getWeb3 from '../../getWeb3';

function newItem(name, price) {
  console.log(name,price);
  let scope = {};
  return getWeb3.then((res) => {
    scope = res;
    return scope.contract.deployed(); 
  })
  .then(function(instance) {
    return instance.addItem(name, price, {from: scope.web3.eth.accounts[0]});
  });
}


function* submitNewItem(action) {
  try {
    console.log("NAME", action.name);
    console.log("PRICE", action.price);
    const response = yield call(newItem, action.name, action.price);
    console.log(response);
    
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