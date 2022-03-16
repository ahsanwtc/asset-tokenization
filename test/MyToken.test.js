const { expectRevert } = require('@openzeppelin/test-helpers');
const chai = require('./setup-chai');

expect = chai.expect;

require('dotenv').config({ path: '../.env' });

const MyToken = artifacts.require('MyToken');
const BN = web3.utils.BN;

contract('MyToken', accounts => {
  const [admin, recipient, anotherAccount] = accounts;
  let myToken, totalSupply;

  beforeEach('should setup the MyToken instance', async () => {
    myToken = await MyToken.new(process.env.INITIAL_TOKENS);
    totalSupply = await myToken.totalSupply();
  });

  it('should have total supply of minted tokens', async () => {    
    await expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply);
    // const totalBalance = await myToken.balanceOf(admin);
    // assert(totalSupply.toNumber() === totalBalance.toNumber());
  });

  it('should tranfers tokens from one account to another', async () => {
    const amount = 1;
    await expect(myToken.transfer(recipient, amount)).to.eventually.be.fulfilled;
    await expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amount)));
    await expect(myToken.balanceOf(recipient)).to.be.eventually.be.a.bignumber.equal(new BN(amount));
  });

  it('should not transfer tokens more than the balance', async () => {
    const amountToTransfer = new BN(totalSupply + 1);
    await expect(myToken.transfer(anotherAccount, amountToTransfer)).to.eventually.be.rejected;
    
    /**
     * check if balance is still the same
     */
    await expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

});