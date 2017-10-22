import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Proposals } from './proposals';

Meteor.methods({
  'proposals.remove'(proposalId) {
    check(proposalId, String);
    if (
      !this.userId ||
      !Meteor.settings.adminsAddresses.includes(
        Meteor.users.findOne(this.userId).services.ethereum.id)
    ) {
      throw new Meteor.Error('not-allowed');
    }

    Proposals.remove(proposalId);
  },
});
