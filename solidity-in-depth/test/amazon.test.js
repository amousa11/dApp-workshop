var Amazon = artifacts.require('Amazon');

contract('Amazon', function (accounts) {

  var start;
  var end;

  it("should add one item", async () => {
    let amazon = await Amazon.deployed();

    sku = await amazon.skuCount();
    const addedItem = await amazon.addItem("Spoon", web3.toWei('10', 'ether'), { from: accounts[0] });
    const item = await amazon.items(sku);

    const expectedItem = { name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), seller: accounts[0], buyer: accounts[0], state: 0 };
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check addItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check addItem');
    assert.equal(item[2].toString(), expectedItem.price, 'item price incorrect, check addItem');
    assert.equal(item[3].toString(), expectedItem.state, 'item state incorrect, check addItem');
    assert.equal(item[4], expectedItem.seller, 'item seller incorrect, check addItem');
    assert.equal(item[5], 0, 'item buyer incorrect, check buyItem');
  });

  it("should sell one item", async () => {
    let amazon = await Amazon.deployed();

    await amazon.buyItem(sku, { from: accounts[1], value: web3.toWei('10', 'ether') });

    const expectedItem = { name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), seller: accounts[0], buyer: accounts[1], state: 1 };
    const item = await amazon.items(sku);
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check buyItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check buyItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check buyItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check buyItem');
    assert.equal(item[4], expectedItem.seller, 'item seller incorrect, check addItem');
    assert.equal(item[5], expectedItem.buyer, 'item buyer incorrect, check buyItem');
  });

  it("should ship one item", async () => {
    let amazon = await Amazon.deployed();

    await amazon.shipItem(sku, { from: accounts[0] });

    const expectedItem = { name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), seller: accounts[0], buyer: accounts[1], state: 2 };
    const item = await amazon.items(sku);

    assert.equal(item[0], expectedItem.name, 'item name incorrect, check shipItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check shipItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check shipItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check shipItem');
    assert.equal(item[4], expectedItem.seller, 'item seller incorrect, check addItem');
    assert.equal(item[5], expectedItem.buyer, 'item buyer incorrect, check shipItem');
  });

  it("should receive one item", async () => {
    let amazon = await Amazon.deployed();

    await amazon.receiveItem(sku, { from: accounts[1] });

    const expectedItem = { name: "Spoon", sku: sku.toString(), price: web3.toWei('10', 'ether'), seller: accounts[0], buyer: accounts[1], state: 3 };
    const item = await amazon.items(sku);
    assert.equal(item[0], expectedItem.name, 'item name incorrect, check receiveItem');
    assert.equal(item[1].toString(), expectedItem.sku, 'item sku incorrect, check receiveItem');
    assert.equal(item[2], expectedItem.price, 'item price incorrect, check receiveItem');
    assert.equal(item[3], expectedItem.state, 'item state incorrect, check receiveItem');
    assert.equal(item[4], expectedItem.seller, 'item seller incorrect, check addItem');
    assert.equal(item[5], expectedItem.buyer, 'item buyer incorrect, check receiveItem');
  });

  it("should add many items", async () => {
    let amazon = await Amazon.deployed();
    const expectedItems = []
    sku = await amazon.skuCount();

    start = sku.toNumber();
    end = sku.toNumber() + 10;

    for (var i = start; i < end; i++) {
      expectedItems[i] = { name: "Spoon" + i.toString(), sku: i, price: web3.toWei('10', 'ether'), seller: accounts[i % 10], buyer: accounts[i % 10], state: 0 };
      await amazon.addItem(expectedItems[i].name, expectedItems[i].price, { from: accounts[i % 10] });
    }

    for (var i = start; i < end; i++) {
      const item = await amazon.items(i);

      assert.equal(item[0], expectedItems[i].name, 'item name incorrect, check addItem');
      assert.equal(item[1].toNumber(), expectedItems[i].sku, 'item sku incorrect, check addItem');
      assert.equal(item[2].toNumber(), expectedItems[i].price, 'item price incorrect, check addItem');
      assert.equal(item[3].toNumber(), expectedItems[i].state, 'item state incorrect, check addItem');
      assert.equal(item[4].toString(), expectedItems[i].seller, 'item seller incorrect, check addItem');
      assert.equal(item[5], 0, 'item buyer incorrect, check addItem');
    }
  });

  it("should buy many items", async () => {
    let amazon = await Amazon.deployed();
    const expectedItems = []

    for (var i = start; i < end; i++) {
      expectedItems[i] = { name: "Spoon" + i.toString(), sku: i, price: web3.toWei('10', 'ether'), seller: accounts[i % 10], buyer: accounts[(i + 1) % 10], state: 1 };
      await amazon.buyItem(i, { from: accounts[(i + 1) % 10], value: web3.toWei('10', 'ether') });
    }

    for (var i = start; i < end; i++) {
      const item = await amazon.items(i);

      assert.equal(item[0], expectedItems[i].name, 'item name incorrect, check buyItem');
      assert.equal(item[1].toNumber(), expectedItems[i].sku, 'item sku incorrect, check buyItem');
      assert.equal(item[2].toNumber(), expectedItems[i].price, 'item price incorrect, check buyItem');
      assert.equal(item[3].toNumber(), expectedItems[i].state, 'item state incorrect, check buyItem');
      assert.equal(item[4], expectedItems[i].seller, 'item seller incorrect, check addItem');
      assert.equal(item[5], expectedItems[i].buyer, 'item buyer incorrect, check buyItem');
    }
  });

  it("should ship many items", async () => {
    let amazon = await Amazon.deployed();
    const expectedItems = []

    for (var i = start; i < end; i++) {
      expectedItems[i] = { name: "Spoon" + i.toString(), sku: i, price: web3.toWei('10', 'ether'), seller: accounts[i % 10], buyer: accounts[(i + 1) % 10], state: 2 };
      await amazon.shipItem(i, { from: accounts[i % 10] });
    }

    for (var i = start; i < end; i++) {
      const item = await amazon.items(i);

      assert.equal(item[0], expectedItems[i].name, 'item name incorrect, check shipItem');
      assert.equal(item[1].toNumber(), expectedItems[i].sku, 'item sku incorrect, check shipItem');
      assert.equal(item[2].toNumber(), expectedItems[i].price, 'item price incorrect, check shipItem');
      assert.equal(item[3].toNumber(), expectedItems[i].state, 'item state incorrect, check shipItem');
      assert.equal(item[4], expectedItems[i].seller, 'item seller incorrect, check addItem');
      assert.equal(item[5], expectedItems[i].buyer, 'item buyer incorrect, check buyItem');
    }
  });

  it("should receive many items", async () => {
    let amazon = await Amazon.deployed();
    const expectedItems = []

    for (var i = start; i < end; i++) {
      expectedItems[i] = { name: "Spoon" + i.toString(), sku: i, price: web3.toWei('10', 'ether'), seller: accounts[i % 10], buyer: accounts[(i + 1) % 10], state: 3 };
      await amazon.receiveItem(i, { from: accounts[(i + 1) % 10] });
    }

    for (var i = start; i < end; i++) {
      const item = await amazon.items(i);

      assert.equal(item[0], expectedItems[i].name, 'item name incorrect, check receiveItem');
      assert.equal(item[1].toNumber(), expectedItems[i].sku, 'item sku incorrect, check receiveItem');
      assert.equal(item[2].toNumber(), expectedItems[i].price, 'item price incorrect, check receiveItem');
      assert.equal(item[3].toNumber(), expectedItems[i].state, 'item state incorrect, check receiveItem');
      assert.equal(item[4], expectedItems[i].seller, 'item seller incorrect, check addItem');
      assert.equal(item[5], expectedItems[i].buyer, 'item buyer incorrect, check buyItem');
    }
  });
});
