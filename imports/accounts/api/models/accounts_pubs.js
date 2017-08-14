import { Accounts } from './accounts';

Meteor.publish('accounts.balance', accountId =>
  Accounts.find(accountId, { fields: {
    _id: 1,
    balance: 1,
  } }));
