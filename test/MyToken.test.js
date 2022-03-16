const { expectRevert } = require('@openzeppelin/test-helpers');
const chai = require('chai');

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

const MyToken = artifacts.require('MyToken');

contract('MyToken', accounts => {
  const [admin, recipient, anotherAccount] = accounts;
  let myToken, totalSupply;

  beforeEach('should setup the MyToken instance', async () => {
    myToken = await MyToken.new(1000000);
    totalSupply = await myToken.totalSupply();
  });

  it('should have total supply of minted tokens', async () => {    
    expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply);
    // const totalBalance = await myToken.balanceOf(admin);
    // assert(totalSupply.toNumber() === totalBalance.toNumber());
  });

  it('should tranfers tokens from one account to another', async () => {
    const amount = 1;
    expect(myToken.transfer(recipient, amount)).to.eventually.be.fulfilled;
    expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(amount)));
    expect(myToken.balanceOf(recipient)).to.be.eventually.be.a.bignumber.equal(new BN(amount));
  });

  it.skip('should not transfer tokens more than the balance', async () => {
    const amountToTransfer = new BN(totalSupply + 1);
    
    // await expectRevert(
    //   myToken.transfer(anotherAccount, amountToTransfer),
    //   'gggg'
    // );
    try {
      
      await myToken.transfer(anotherAccount, amountToTransfer)
    } catch (error) {
      console.log(error);
    }
    // await expect(myToken.transfer(anotherAccount, amountToTransfer)).to.eventually.be.rejected;
    
    /**
     * check if balance is still the same
     */
    // expect(myToken.balanceOf(admin)).to.eventually.be.a.bignumber.equal(totalSupply);
  });

});