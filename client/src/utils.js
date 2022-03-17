import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";

export const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();    
    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        resolve(web3);
      } catch(error) {
        reject(error);
      }
    } 
    
    reject('Install Metamask');    
  });
};

export const getContracts = async web3 => {
  const networkId = await web3.eth.net.getId();

  const token = new web3.eth.Contract(MyToken.abi, MyToken.networks[networkId] && MyToken.networks[networkId].address);
  const tokenSale = new web3.eth.Contract(MyTokenSale.abi, MyTokenSale.networks[networkId] && MyTokenSale.networks[networkId].address);
  const kyc = new web3.eth.Contract(KYCContract.abi, KYCContract.networks[networkId] && KYCContract.networks[networkId].address);
  return { token, tokenSale, kyc };
};

export const getTokenSaleContractAddress = async web3 => {
  const networkId = await web3.eth.net.getId();
  return MyTokenSale.networks[networkId].address;
}