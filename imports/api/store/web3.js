import Web3 from 'web3';

const web3 = new Web3();

window.addEventListener('load', () => {
  if (window.parent.web3) {
    web3.setProvider(window.parent.web3.currentProvider);
    delete window.web3;
  }
});

export default web3;
