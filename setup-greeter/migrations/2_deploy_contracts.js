var Greeter = artifacts.require("./Greeter.sol");
const args = {_greeting: "test greeting"}; //TODO: don't hard code test values

module.exports = function(deployer) {
  deployer.deploy(Greeter, args._greeting);
};
