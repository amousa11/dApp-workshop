import { takeLatest, put } from 'redux-saga/effects';
import {
  INST_CONTRACT,
  instantiateContractSuccess,
  instantiateContractFailure
} from './home.actions';
import AmazonContract from '../../../build/contracts/Amazon.json';
import getWeb3 from '../../getWeb3';

function* instantiateContract(action) {
  try {
    var response = yield getWeb3;
    const web3 = response.web3;
    const provider = response.provider;
    const amazon = response.contract;

    yield put(instantiateContractSuccess(amazon, web3));
  }
  catch (err) {
    yield put(instantiateContractFailure(err));
  }
}

export default function* watchInstantiateContract() {
  yield takeLatest(INST_CONTRACT, instantiateContract);
}