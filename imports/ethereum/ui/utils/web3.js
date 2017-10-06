import Web3 from 'web3';

let web3 = new Web3();

window.addEventListener('load', function() {
  if (window.web3) {
    web3.setProvider(window.web3.currentProvider);
    delete window.web3;
  } else if (window.parent !== window && window.parent.web3 !== undefined) {
    web3.setProvider(window.parent.web3.currentProvider);
  }
});

export default web3;
