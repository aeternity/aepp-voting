import Web3 from 'web3';

let web3 = new Web3();

window.addEventListener('load', function() {
  if (window.parent.web3) {
    web3.setProvider(window.parent.web3.currentProvider);
    delete window.web3;
  }
});

export default web3;
