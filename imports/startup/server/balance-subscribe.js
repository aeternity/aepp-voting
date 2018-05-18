import { Meteor } from 'meteor/meteor';
import { onErc20ContractReceiving } from './tokenContract';
import { Accounts } from '../../api/accounts/accounts';

onErc20ContractReceiving(erc20contract =>
  erc20contract.Transfer({}, Meteor.bindEnvironment((err, event) => {
    if (err) throw err;
    const { args: { _from, _to, _value } } = event;
    const value = +_value.shift(erc20contract.decimals().neg());
    Accounts.update(_from, { $inc: { balance: -value } });
    Accounts.update(_to, { $inc: { balance: value } });
  })));
