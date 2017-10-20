pragma solidity ^0.4.15;



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
    }

    function addItem(string _name, uint _price) public {
        items[skuCount] = Item(
            _name, 
            skuCount, 
            _price, 
            State.ForSale,
            msg.sender,
            0x0);        
        LogForSale(skuCount);
        skuCount = skuCount + 1;
    }

    function buyItem(uint sku) public payable
    forSale(sku)
    paidEnough(items[sku].price)
    checkValue(items[sku].price)
    {
        items[sku].seller.transfer(msg.value);
        items[sku].buyer = msg.sender;
        items[sku].state = State.Sold;
        LogSold(sku);
    }

    function shipItem(uint sku) public
    isOwner(items[sku].seller)
    sold(sku) 
    {
        items[sku].state = State.Shipped;
        LogShipped(sku);
    }

    function receiveItem(uint sku) public
    isOwner(items[sku].buyer)
    shipped(sku) 
    {
        items[sku].state = State.Received;
        LogReceived(sku);
    }
}
