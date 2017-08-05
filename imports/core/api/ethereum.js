import { Meteor } from 'meteor/meteor';
import cp from 'child_process';
import Web3 from 'web3';
import promisify from 'es6-promisify';

let erc20contract;

export const onErc20ContractReceiving = callBack =>
  erc20contract ? callBack(erc20contract) : callBacks.push(callBack);

const callBacks = [];
const setupDevnet = Meteor.isDevelopment && !Meteor.settings.web3ProviderUrl;
const exec = promisify(cp.exec);

const newContract = (contract, options) =>
  new Promise((resolve, reject) => {
    contract.new(options, (err, contractInstance) => {
      if (err) return reject(err);
      if (contractInstance.address) resolve(contractInstance.address);
    });
  });

(async () => {
  if (setupDevnet) {
    console.log('Running the dev network');
    await exec('rm -rf devnet');
    await exec('bash -c "geth --datadir devnet account new --password <(echo)"');
    const geth = cp.spawn('geth', [
      '--dev', '--datadir', 'devnet',
      '--rpc', '--rpcapi', 'eth,net,web3,personal',
      '--mine', '--minerthreads', '1',
    ]);
    geth.stdout.on('data', data => process.stdout.write(data));
    if (Meteor.settings.showGethOutput) {
      geth.stderr.on('data', data => process.stdout.write(data));
    }
    await exec('sleep 4');
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(Meteor.settings.web3ProviderUrl));
  let contractAddress = Meteor.settings.erc20ContractAddress;

  if (setupDevnet) {
    const contractAbi = JSON.parse(Assets.getText('erc20-contract/ERC20Token.abi'));
    const contractBin = Assets.getText('erc20-contract/ERC20Token.bin');
    const coinbase = web3.eth.coinbase;
    web3.personal.unlockAccount(coinbase, '');
    const address = await newContract(
      web3.eth.contract(contractAbi),
      { data: '0x' + contractBin, from: coinbase, gas: 1000000 });
    console.log(`Contract deployed in devnet with address: ${address}`);
    contractAddress = contractAddress || address;
  }

  erc20contract = web3.eth
    .contract(JSON.parse(Assets.getText('erc20-contract/ERC20Interface.abi')))
    .at(contractAddress);
  callBacks.forEach(cb => cb(erc20contract));
})().catch(error => console.error(error.stack));
