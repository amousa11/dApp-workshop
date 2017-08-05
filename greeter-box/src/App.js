import React, { Component } from 'react'
import GreeterContract from '../build/contracts/Greeter.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      greeting: 0,
      greetingInput: '',
      greeter: null,
      web3: null
    }
    this.greet = this.greet.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const greeter = contract(GreeterContract)
    greeter.setProvider(this.state.web3.currentProvider)

    this.setState({greeter: greeter});

    // Declaring this for later so we can chain functions on SimpleStorage.
    var greeterInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      greeter.deployed().then((instance) => {
        greeterInstance = instance
        // Stores a given value, 5 by default.
        return greeterInstance.greet.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ greeting: result, greeter: greeterInstance });
      })
    })
  }

  greet() {
    const greeter = this.state.greeter;
    const newGreeting = this.state.greetingInput;
    this.state.web3.eth.getAccounts((error, accounts) =>{
      greeter.setGreeting(newGreeting, {from: accounts[0]})
        .then(() => {
          return greeter.greet.call(accounts[0]);
        })
        .then((result) => {
          this.setState({greeting: result, greetingInput: ''});
        });
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value on the contract (if there is one).</p>
              <p>Try changing the value below and then clicking "Submit New Greeting"</p>
              <p>The stored value is: {this.state.greeting}</p>
              <p>Set Greeting</p> <div><input type="text" onChange={(e) => {this.setState({greetingInput: e.target.value});}}/></div>
              <button onClick={this.greet}>Submit New Greeting</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
