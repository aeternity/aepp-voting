/* global Assets */
/* eslint-disable no-console */

import { Meteor } from 'meteor/meteor';
import Web3 from 'web3';

let erc20contract;
const callBacks = [];

export const onErc20ContractReceiving = callBack =>
  (erc20contract ? callBack(erc20contract) : callBacks.push(callBack));

(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(Meteor.settings.web3ProviderUrl));

  erc20contract = web3.eth
    .contract(JSON.parse(Assets.getText('erc20-contract/ERC20Token.abi')))
    .at(Meteor.settings.erc20ContractAddress);
  callBacks.forEach(cb => cb(erc20contract));
})().catch(error => console.error(error.stack));
