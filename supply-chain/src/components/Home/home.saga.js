import { takeLatest, put, call } from 'redux-saga/effects';
import {
    INJECT_WEB3,
    injectWeb3Success,
    injectWeb3Failure
} from './home.actions';
import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function () {
        var results
        var web3 = window.web3

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)

            results = {
                web3: web3
            }

            console.log('Injected web3 detected.');

            resolve(results)
        } else {
            // Fallback to localhost if no web3 injection.
            var provider = new Web3.providers.HttpProvider('http://localhost:8545')

            web3 = new Web3(provider)

            results = {
                web3: web3
            }

            console.log('No web3 instance injected, using Local web3.');

            resolve(results)
        }
    })
})

function* injectWeb3(action) {
    try {
        const response = yield getWeb3;
        yield put(injectWeb3Success(response));
    }
    catch (err) {
        yield put(injectWeb3Failure(err));
    }
}

export default function* watchInjectWeb3() {
    yield takeLatest(INJECT_WEB3, injectWeb3);
}