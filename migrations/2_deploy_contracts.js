require('dotenv').config({ path: '../.env' });

const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require('MyTokenSale');

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address);
  const myToken = await MyToken.deployed();
  await myToken.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
};
