pragma solidity ^0.4.11;
contract greeter {
  /* Add one variable to hold our greeting (string)*/
  string greeting;

  function greeter(string _greeting) public {
    /* Write one line of code for the contract to set our greeting*/
    greeting = _greeting;
  }

  function greet() constant returns (string)  {
    /* Write one line of code to allow the contract to return our greeting */
    return greeting;
  }
}
