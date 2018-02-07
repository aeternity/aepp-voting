import { WebApp } from 'meteor/webapp';

import { onErc20ContractReceiving } from '/imports/ethereum';
import { Proposals } from '../../api/models/proposals';

onErc20ContractReceiving(erc20contract =>
  WebApp.connectHandlers.use('/health', (req, res) => {
    let web3Provider;
    try {
      const balance = erc20contract.balanceOf('0x0');
      web3Provider = typeof balance === 'object' ? 'ok' : 'invalid-value';
    } catch (e) {
      web3Provider = 'exception';
    }

    let database;
    try {
      const count = Proposals.find().count();
      database = (typeof count !== 'number' && 'invalid-value') ||
        (count > 0 && 'ok') || 'no-proposals';
    } catch (e) {
      database = 'exception';
    }

    res.end(JSON.stringify({
      web3Provider,
      database,
    }));
  }));
