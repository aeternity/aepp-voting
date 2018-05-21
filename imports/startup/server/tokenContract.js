/* global Assets */

import { Meteor } from 'meteor/meteor';
import Web3 from 'web3';

const { abi, networks } =
  JSON.parse(Assets.getText('truffle/build/contracts/ERC20Token.json'));

export const init = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Meteor.settings.web3ProviderUrl));
  const networkId = web3.version.network;
  if (!networks[networkId]) {
    throw new Error(`ERC20 token is not deployed on network with id ${networkId}`);
  }
  const contract = web3.eth.contract(abi).at(networks[networkId].address);
  const decimals = contract.decimals();

  module.exports.default = contract;
  module.exports.decimals = decimals;
};
