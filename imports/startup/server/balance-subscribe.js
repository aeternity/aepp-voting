import { Meteor } from 'meteor/meteor';
import erc20contract, { decimals } from './tokenContract';
import { Accounts } from '../../api/accounts/accounts';

erc20contract.Transfer({}, Meteor.bindEnvironment((err, event) => {
  if (err) throw err;
  const { args: { _from, _to, _value } } = event;
  const value = +_value.shift(decimals.neg());
  Accounts.update(_from, { $inc: { balance: -value } });
  Accounts.update(_to, { $inc: { balance: value } });
}));
