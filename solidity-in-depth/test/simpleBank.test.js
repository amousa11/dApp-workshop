var SimpleBank = artifacts.require("./SimpleBank.sol");

contract('SimpleBank', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1];
  const bob = accounts[2];

  it("should put 1000 MetaCoin in the first account", function() {
    let bank = undefined;
    return SimpleBank
    .deployed()
    .then(function(instance) {
      bank = instance;
      return instance.enroll(alice);
    })
    .then(function(enrollBalance) {
      return bank.balance(alice)
    })
    .then(function(balance) {
      assert.equal(balance.toString(), web3.toBigNumber(1000).toString(), "1000 wasn't in the first account, check balance method or constructor");
    })
    .then(function(instance) {
      return bank.enroll(bob);
    })
    .then(function(enrollBalance) {
      return bank.balance(bob)
    })
    .then(function(balance) {
      assert.equal(balance.toString(), web3.toBigNumber(1000).toString(), "1000 wasn't in the second account, check balance method or constructor");
    });
  });

  it("should deposit correct amount", function() {
    let bank = undefined;
    const deposit = web3.toBigNumber(2000);
    const expectedEventResult = {accountAddress: alice.address, amount: deposit};
    const expectedBalance = web3.toBigNumber(deposit).plus(web3.toBigNumber(1000)).toString();
    return SimpleBank
    .deployed()
    .then(function(instance) {
      bank = instance;
      return bank.deposit(alice, deposit);
    })
    .then(function(txReceipt) {
      var events = bank.allEvents();
      return new Promise(function(resolve, reject) {
        events.watch(function(error, log){ resolve(log);});
      });
    })
    .then(function(log) {
        const logAccountAddress = log.args.accountAddress;
        const logAmount = log.args.amount;
        assert.equal(expectedEventResult.accountAddress, expectedEventResult.accountAddress, "LogDepositMade event accountAddress property not emmitted, check deposit method");
        assert.equal(expectedEventResult.amount, expectedEventResult.amount, "LogDepositMade event amount property not emmitted, check deposit method");
    })
    .then(function() {
      return bank.balance(alice);
    })
    .then(function(balance) {
      assert.equal(web3.toBigNumber(balance).toString(), web3.toBigNumber(expectedBalance).toString(), 'balance incorrect after deposit, check deposit method');
    });
  });


});
