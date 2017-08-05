var Greeter = artifacts.require("./Greeter.sol");
var Mortal = artifacts.require("./Mortal.sol");

module.exports = function(deployer) {
  deployer.deploy(Mortal);
  deployer.link(Mortal, Greeter);
  deployer.deploy(Greeter);
};
