import { onErc20ContractReceiving } from '/imports/ethereum';
import { Accounts } from '../accounts';

onErc20ContractReceiving(erc20contract =>
  erc20contract.Transfer({}, (err, event) => {
    if (err) throw err;
    const { args: { _from, _to, _value } } = event;
    Accounts.update(_from, { $inc: { balance: -_value } });
    Accounts.update(_to, { $inc: { balance: +_value } });
  }));
