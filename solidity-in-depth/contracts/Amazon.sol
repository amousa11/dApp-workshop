pragma solidity ^0.4.16;


contract Amazon {
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

    event LogForSale(uint sku);
    event LogSold(uint sku);
    event LogShipped(uint sku);
    event LogReceived(uint sku);

    modifier isOwner (address owner) {require(msg.sender == owner); _;}
    modifier paidEnough(uint value) {require(value <= msg.value); _;}

    modifier checkValue(uint amount) {
      _;
      if (msg.value > amount) {
        uint amountToRefund = amount - msg.value;
        msg.sender.transfer(amountToRefund);
      }
    }

    modifier forSale (uint sku) {
        require (items[sku].state == State.ForSale);
        _;
    }

    modifier sold (uint sku) {
        require (items[sku].state == State.Sold);
        _;
    }

    modifier shipped (uint sku) {
        require (items[sku].state == State.Shipped);
        _;
    }

    modifier received (uint sku) {
        require (items[sku].state == State.Received);
        _;
    }


    function Amazon() public {
        skuCount = 0;
    }

    function addItem(string _name, uint _price) public {
        LogForSale(skuCount);
        skuCount = skuCount + 1;
        items[skuCount] = Item(
            _name, 
            skuCount, 
            _price, 
            State.ForSale,
            msg.sender,
            0x0);
    }

    function buyItem(uint sku) public payable
    forSale(sku)
    paidEnough(items[sku].price)
    checkValue(items[sku].price)
    {
        LogSold(sku);
        items[sku].seller.transfer(msg.value);
        items[sku].buyer = msg.sender;
        items[sku].state = State.Sold;
    }

    function shipItem(uint sku) public
    isOwner(items[sku].seller)
    sold(sku) 
    {
        LogShipped(sku);
        items[sku].state = State.Shipped;
    }

    function receiveItem(uint sku) public
    isOwner(items[sku].buyer)
    shipped(sku) 
    {
        LogReceived(sku);
        items[sku].state = State.Received;
    }

    function fetchLast() public view returns (string name, uint sku, uint price, uint state, address seller, address buyer) {
        name = items[skuCount].name;
        sku = items[skuCount].sku;
        price = items[skuCount].price;
        state = uint(items[skuCount].state);
        seller = items[skuCount].seller;
        buyer = items[skuCount].buyer;
        return (name, sku, price, state, seller, buyer);
    }

}
