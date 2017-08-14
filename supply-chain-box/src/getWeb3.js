var Web3 = require('web3');
var AmazonContract = require('../build/contracts/Amazon.json');
var contract = require('truffle-contract');

var getWeb3 = new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function () {
        var results
        var web3 = window.web3

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3();
            web3.setProvider(web3.currentProvider);

            results = {
                web3: web3,
                provider: web3.currentProvider
            }

            console.log('Injected web3 detected.');

            resolve(results)
        } else {
            // Fallback to localhost if no web3 injection.
            const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            web3 = new Web3(provider);

            results = {
                web3: web3,
                provider: provider
            }

            console.log('No web3 instance injected, using Local web3.');
        }

        const amazon = contract(AmazonContract);
        amazon.setProvider(results.provider);

        results.contract = amazon;

        resolve(results);
    })
});

export default getWeb3;