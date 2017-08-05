pragma solidity ^0.4.11;

contract Amazon {
  address private STORE;
  uint skuCount;
  mapping (uint => Item) items;

  enum State { ForSale, Sold, Shipped, Received }

  struct Item {
    string name;
    uint sku;
    uint price;
    State state;
    address owner;
  }

  event ForSale(uint sku);
  event Sold(uint sku);
  event Shipped(uint sku);
  event Received(uint sku);

  modifier isOwner (address owner) { if (msg.sender == owner) _;  else throw;}
  modifier ifDoesNotExist (string name, uint sku, uint price) { if (items[sku].sku != sku) _; }
  modifier paidEnough(uint value) {
    if (value <= msg.value) {
      _;
    }
    else {
      throw;
    }
  }

  modifier checkValue(uint amount) {
    _;
    if (msg.value > amount) {
      uint amountToRefund = amount - msg.value;
      if (!msg.sender.send(amountToRefund)) {
        throw;
      }
    }
  }

  modifier forSale (uint sku) { if (items[sku].state == State.ForSale) _; }
  modifier sold (uint sku) { if (items[sku].state == State.Sold) _; }
  modifier shipped (uint sku) { if (items[sku].state == State.Shipped) _; }
  modifier received (uint sku) { if (items[sku].state == State.Received) _; }


  function Amazon() {
    setOwner(msg.sender);
    skuCount = 1;
  }

  function setOwner(address owner) internal {
    STORE = owner;
  }

  function addItem(string _name, uint _price) ifDoesNotExist(_name, skuCount, _price) {
    ForSale(skuCount);
    items[skuCount] = Item({name: _name, sku: skuCount++, price: _price, state: State.ForSale, owner: STORE});
  }

  function buyItem(uint sku)
  forSale(sku)
  paidEnough(items[sku].price)
  checkValue(items[sku].price){
    Sold(sku);
    items[sku].owner = msg.sender;
    items[sku].state = State.Sold;
  }

  function shipItem(uint sku)
  isOwner(STORE)
  sold(sku) {
    Shipped(sku);
    items[sku].state = State.Shipped;
  }

  function receiveItem(uint sku)
  isOwner(items[sku].owner)
  shipped(sku) {
    Received(sku);
    items[sku].state = State.Received;
  }

  function queryItem(uint _sku) returns (string, uint, uint, uint, address) {
    string name = items[_sku].name;
    uint sku = items[_sku].sku;
    uint price = items[_sku].price;
    uint state = uint(items[_sku].state);
    address owner = items[_sku].owner;
    return (name, sku, price, state, owner);
  }

}
