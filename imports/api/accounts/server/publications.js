import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from '../accounts';

Meteor.publish('accounts.balance', (accountId) => {
  check(accountId, String);

  return Accounts.find(accountId, {
    fields: {
      _id: 1,
      balance: 1,
    },
  });
});
