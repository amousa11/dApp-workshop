import { takeLatest, put, call } from 'redux-saga/effects';
import {
    FETCH_ITEMS,
    fetchItemsSuccess,
    fetchItemsFailure
} from './items.actions';
import getWeb3 from '../../getWeb3';

function fetchItems() {
    let scope = {};
    return getWeb3.then((res) => {
        scope = res;
        return scope.contract.deployed();
    })
    .then(function(instance) {
        scope.instance = instance;
        return instance.skuCount().then((count) => {return count.toNumber()});
    })
    .then(function (count) {
        const items = []
        for (var i = 0; i < count; i++) {
            items.push(scope.instance.fetchLast(i));
        }
        console.log(items);
        return items;
    });
}


function* submitFetchItems(action) {
    try {
        const response = yield call(fetchItems);

        yield put(fetchItemsSuccess(response));
    }
    catch (err) {
        yield put(fetchItemsFailure(err));
    }
}

export default function* watchFetchItems() {
    yield takeLatest(FETCH_ITEMS, submitFetchItems);
}