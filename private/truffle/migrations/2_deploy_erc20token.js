/* global artifacts */

const ERC20Token = artifacts.require('./ERC20Token.sol');

module.exports = (deployer) => {
  deployer.deploy(ERC20Token);
};
