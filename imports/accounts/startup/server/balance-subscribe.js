import { onErc20ContractReceiving } from '/imports/ethereum';
import { Accounts } from '../../api/models/accounts';

onErc20ContractReceiving(erc20contract =>
  erc20contract.Transfer({}, Meteor.bindEnvironment((err, event) => {
    if (err) throw err;
    const { args: { _from, _to, _value } } = event;
    const value = +_value.shift(erc20contract.decimals().neg());
    Accounts.update(_from, { $inc: { balance: -value } });
    Accounts.update(_to, { $inc: { balance: value } });
  })));
