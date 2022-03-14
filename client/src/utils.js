import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

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