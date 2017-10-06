import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'accounts.checkPossibleAdmin'(accountId) {
    check(accountId, String);

    return Meteor.settings.adminsAddresses.includes(accountId.toLowerCase());
  },
});
