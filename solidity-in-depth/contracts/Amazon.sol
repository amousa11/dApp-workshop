pragma solidity ^0.4.13;

contract Amazon {

  /* Add a variable called skuCount to track the most recent sku # */

  /* Add a line that creates a public mapping that maps the SKU (a number) to an Item.
     Call this mappings items 
  */

  /* Add a line that creates an enum called State. This should have 4 states
    ForSale
    Sold
    Shipped
    Received
  */

  /* Create a struct named Item. 
    Here, add a name, sku, price, state, seller, and buyer 
    We've left you to figure out what the appropriate types are, 
    if you need help you can ask around :)
  */

  /* Create 4 events with the same name as each possible State (see above)
    Each event should accept one argument, the sku*/


  modifier isOwner (address owner) { }
  modifier paidEnough(uint value) { }

  modifier checkValue(uint amount) {
  }

  /* For each of the following modifiers, use what you learned about modifiers
   to give them functionality. For example, the forSale modifier should require 
   that the item with the given sku has the state ForSale. */
  modifier forSale (uint sku) { }
  modifier sold (uint sku) { }
  modifier shipped (uint sku) { }
  modifier received (uint sku) { }


  function Amazon() {
    /* Here, set the owner as the person who instantiated the contract
       and set your skuCount to 0. */
  }

  function addItem(string _name, uint _price) {
    ForSale(skuCount);
    skuCount = skuCount + 1;
    items[skuCount] = Item({name: _name, sku: skuCount, price: _price, state: State.ForSale, seller: msg.sender, buyer: msg.sender});
  }

  /* Add a keyword so the function can be paid. This function should transfer money
    to the seller, set the buyer as the person who called this transaction, and set the state
    to Sold. Be careful, this function should use 3 modifiers to check if the item is for sale, 
    if the buyer paid enough, and check the value after the function is called to make sure the buyer is
    refunded any excess ether sent. Remember to call the event associated with this function!*/
  function buyItem(uint sku) payable
  forSale(sku)
  paidEnough(items[sku].price)
  checkValue(items[sku].price){
    Sold(sku);
    items[sku].seller.transfer(msg.value);
    items[sku].buyer = msg.sender;
    items[sku].state = State.Sold;
  }

  /* Add 2 modifiers to check if the item is sold already, and that the person calling this function 
  is the seller. Change the state of the item to shipped. Remember to call the event associated with this function!*/
  function shipItem(uint sku)
  isOwner(items[sku].seller)
  sold(sku) {
    Shipped(sku);
    items[sku].state = State.Shipped;
  }

  /* Add 2 modifiers to check if the item is shipped already, and that the person calling this function 
  is the buyer. Change the state of the item to received. Remember to call the event associated with this function!*/
  function receiveItem(uint sku)
  isOwner(items[sku].buyer)
  shipped(sku) {
    Received(sku);
    items[sku].state = State.Received;
  }

  /* We have this function completed so we can run tests, just ignore it :) */
  function fetchLast() returns (string name, uint sku, uint price, uint state, address seller, address buyer) {
    name = items[skuCount].name;
    sku = items[skuCount].sku;
    price = items[skuCount].price;
    state = uint(items[skuCount].state);
    seller = items[skuCount].seller;
    buyer = items[skuCount].buyer;
    return (name, sku, price, state, seller, buyer);
  }

}
