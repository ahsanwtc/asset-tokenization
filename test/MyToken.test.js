const { expectRevert } = require('@openzeppelin/test-helpers');

const MyToken = artifacts.require('MyToken');

contract('MyToken', accounts => {
  const [admin] = [accounts[0], _];
  let myToken;

  beforeEach('should setup the MyToken instance', async () => {
    myToken = await MyToken.new(1000000);
  });

  it('should have total supply of minted tokens', async () => {
    const totalSupply = await myToken.totalSupply();
    const totalBalance = await myToken.balanceOf(admin);
    assert(totalSupply.toNumber() === totalBalance.toNumber());
  });

});