pragma solidity ^0.4.13;

contract Amazon {
  address private STORE;
  uint public latestItem;
  uint public skuCount;
  mapping (uint => Item) public items;

  enum State { ForSale, Sold, Shipped, Received }

  struct Item {
    string name;
    uint sku;
    uint price;
    State state;
    address seller;
    address buyer;
  }

  event ForSale(uint sku);
  event Sold(uint sku);
  event Shipped(uint sku);
  event Received(uint sku);

  modifier isOwner (address owner) { require(msg.sender == owner); _;}
  modifier ifDoesNotExist (string name, uint sku, uint price) { require(items[sku].sku != sku); _; }
  modifier paidEnough(uint value) { require(value <= msg.value); _; }

  modifier checkValue(uint amount) {
    _;
    if (msg.value > amount) {
      uint amountToRefund = amount - msg.value;
      if (!msg.sender.send(amountToRefund)) {
        revert();
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
    latestItem = 1;
  }

  function setOwner(address owner) internal {
    STORE = owner;
  }

  function addItem(string _name, uint _price) ifDoesNotExist(_name, skuCount, _price) returns (string) {
    ForSale(skuCount);
    if (latestItem != 1) { latestItem++; }
    items[skuCount] = Item({name: _name, sku: skuCount++, price: _price, state: State.ForSale, seller: msg.sender, buyer: msg.sender});
    return items[latestItem].name;
  }

  function buyItem(uint sku) payable
  forSale(sku)
  paidEnough(items[sku].price)
  checkValue(items[sku].price){
    Sold(sku);
    items[sku].seller.transfer(msg.value);
    items[sku].buyer = msg.sender;
    items[sku].state = State.Sold;
  }

  function shipItem(uint sku)
  isOwner(items[sku].seller)
  sold(sku) {
    Shipped(sku);
    items[sku].state = State.Shipped;
  }

  function receiveItem(uint sku)
  isOwner(items[sku].buyer)
  shipped(sku) {
    Received(sku);
    items[sku].state = State.Received;
  }

  function fetchLast() returns (string name, uint sku, uint price, uint state, address seller, address buyer) {
    name = items[latestItem].name;
    sku = items[latestItem].sku;
    price = items[latestItem].price;
    state = uint(items[latestItem].state);
    seller = items[latestItem].seller;
    buyer = items[latestItem].buyer;
    return (name, sku, price, state, seller, buyer);
  }

}
