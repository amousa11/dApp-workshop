import { takeLatest, put, call } from 'redux-saga/effects';
import {
    INST_CONTRACT,
    instantiateContractSuccess,
    instantiateContractFailure
} from './home.actions';
import AmazonContract from '../../../build/contracts/Amazon.json';
import Web3 from 'web3'

let amazon = undefined;
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
});

function* instantiateContract(action) {
    try {
        const web3 = yield getWeb3;
        web3.then(function (web3) {
            const contract = require('truffle-contract');
            amazon = contract(AmazonContract);
            amazon.setProvider(web3.currentProvider);
        });
        yield put(instantiateContractSuccess(amazon));
    }
    catch (err) {
        yield put(instantiateContractFailure(err));
    }
}

export default function* watchinstantiateContract() {
    yield takeLatest(INST_CONTRACT, instantiateContract);
}