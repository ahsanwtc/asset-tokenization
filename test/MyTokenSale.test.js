const chai = require('./setup-chai');

const expect = chai.expect;

require('dotenv').config({ path: '../.env' });

const MyToken = artifacts.require('MyToken');
const MyTokenSale = artifacts.require('MyTokenSale');
const BN = web3.utils.BN;

contract('MyTokenSale', accounts => {
  const [admin, recipient, anotherAccount] = accounts;

  it('should not have any balance in the admin account', async () => {
    const instance = await MyToken.deployed();
    await expect(instance.balanceOf(admin)).to.eventually.be.a.bignumber.equal(new BN(0));
  });
});